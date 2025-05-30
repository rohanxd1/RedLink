import { Component, OnInit } from '@angular/core';
import { AdminSupplyLogService, SupplyLog } from '../services/admin-supply-log.service';

@Component({
  selector: 'app-admin-logs',
  standalone: false,
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css']
})
export class AdminLogsComponent implements OnInit {

  logs: SupplyLog[] = [];
  originalStatus: { [logId: number]: string } = {};
  editedStatus: { [logId: number]: string } = {};
  showSuccessMessage = false;
  errorMessage: string | null = null;

  constructor(private supplyLogService: AdminSupplyLogService) {}

  ngOnInit(): void 
  {
    this.loadLogs();
  }

  loadLogs(): void 
  {
    this.supplyLogService.getAllSupplyLogs().subscribe
    (
      {
        next: data => 
          {
            // Sort descending by logId to show newest first
            this.logs = data.sort((a, b) => b.logId - a.logId);

            // Initialize original and edited status maps
            this.logs.forEach(log => 
              {
                this.originalStatus[log.logId] = log.status;
                this.editedStatus[log.logId] = log.status;
              });
            this.errorMessage = null;
          },
        error: () => this.errorMessage = 'Failed to load logs.'
      }
    );
  }

  onStatusChange(logId: number, newStatus: string): void 
  {
    this.editedStatus[logId] = newStatus;
  }

  canCancel(logId: number): boolean
   {
    return this.editedStatus[logId] !== this.originalStatus[logId];
  }

  onCancel(logId: number): void 
  {
    this.editedStatus[logId] = this.originalStatus[logId];
  }

  onConfirm(log: SupplyLog): void 
  {
    const updatedStatus = this.editedStatus[log.logId];
    if (updatedStatus === this.originalStatus[log.logId]) 
      {
        return; // No change, do nothing
      }

    const managedBy = localStorage.getItem('adminEmail') || '';

    // Create partial update object
    const updatedLog = 
    {
      ...log,
      status: updatedStatus,
      managedBy: managedBy
    };

    this.supplyLogService.updateSupplyLog(log.logId, updatedLog).subscribe
    (
      {
        next: (resp) => 
          {
            this.originalStatus[log.logId] = resp.status;
            this.editedStatus[log.logId] = resp.status;
            this.showSuccessMessage = true;
            setTimeout(() => this.showSuccessMessage = false, 3000);
            this.errorMessage = null;
            this.loadLogs(); // Refresh list to get updated values like dateOfTransit and dateOfDelivery if backend sets them
          },
        error: () => this.errorMessage = 'Failed to update the log.'
      });
  }

  clearError(): void 
  {
    this.errorMessage = null;
  }
}
