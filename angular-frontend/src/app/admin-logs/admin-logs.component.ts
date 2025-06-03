import { Component, OnInit } from '@angular/core';
import { AdminSupplyLogService, SupplyLog } from '../services/admin-supply-log.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-logs',
  standalone: false,
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css']
})
export class AdminLogsComponent implements OnInit 
{

  logs: SupplyLog[] = [];  
  originalStatus: { [logId: number]: string } = {};  
  editedStatus: { [logId: number]: string } = {};    
  showSuccessMessage = false; 
  errorMessage: string | null = null; 

  private bloodApiBase = 'http://localhost:8080/admin/blood';

  constructor(private supplyLogService: AdminSupplyLogService, private http: HttpClient) {}

  ngOnInit(): void 
  {
    this.loadLogs(); 
  }

  
  loadLogs(): void {
    this.supplyLogService.getAllSupplyLogs().subscribe(
      {
        next: data => {
          // Sort logs descending by logId (latest first)
          this.logs = data.sort((a, b) => b.logId - a.logId);
         
          this.logs.forEach(log => 
            {
              this.originalStatus[log.logId] = log.status;
              this.editedStatus[log.logId] = log.status;
            });
          this.errorMessage = null;
        },
        error: () => this.errorMessage = 'Failed to load logs.'
      });
  }

  
   // If 'IN-TRANSIT' is selected, checks if enough blood units are available.
   
  async onStatusChange(logId: number, newStatus: string): Promise<void> 
{
  if (newStatus === 'IN-TRANSIT') 
  {
    const log = this.logs.find(l => l.logId === logId);
    if (!log) return;

    try {
      // Encode the blood group to handle special characters like '+'
      const encodedBloodGroup = encodeURIComponent(log.bloodGroup);

      
      const blood = await this.http.get<{ availableUnits: number }>(
        `${this.bloodApiBase}/check?group=${encodedBloodGroup}`
      ).toPromise();

      if (!blood || typeof blood.availableUnits !== 'number') 
      {
        alert('Could not retrieve blood inventory.');
        this.editedStatus[logId] = this.originalStatus[logId];
        return;
      }

      if (blood.availableUnits < log.unitsRequired)
      {
        alert(`Insufficient units. Available = ${blood.availableUnits} units.`);
        this.editedStatus[logId] = this.originalStatus[logId];
        return;
      }

      this.editedStatus[logId] = newStatus;

    } catch (error) {
      alert('Error checking blood inventory.');
      this.editedStatus[logId] = this.originalStatus[logId];
    }
  } 
  else 
  {
    this.editedStatus[logId] = newStatus;
  }
}


  
  canCancel(logId: number): boolean 
  {
    return this.editedStatus[logId] !== this.originalStatus[logId];
  }

  
  onCancel(logId: number): void {
    this.editedStatus[logId] = this.originalStatus[logId];
  }

  
  onConfirm(log: SupplyLog): void {
    const updatedStatus = this.editedStatus[log.logId];

    
    if (updatedStatus === this.originalStatus[log.logId]) 
      {
        return;
      }

    const managedBy = localStorage.getItem('adminEmail') || ''; 

    
    if (updatedStatus === 'IN-TRANSIT') 
      {
      const reduceRequest =
       {
          bloodGroup: log.bloodGroup,
          unitsToReduce: log.unitsRequired
        };

     
      this.http.put(`${this.bloodApiBase}/reduce`, reduceRequest).subscribe({
        next: () => 
          {
         
            this.updateSupplyLogStatus(log, updatedStatus, managedBy);
          },
        error: (err) => {
          alert(`Failed to reduce inventory: ${err.error || 'Unknown error'}`);
          this.editedStatus[log.logId] = this.originalStatus[log.logId]; 
        }
      });
    } 
    else
     {
        
        this.updateSupplyLogStatus(log, updatedStatus, managedBy);
      }
  }

  
  private updateSupplyLogStatus(log: SupplyLog, updatedStatus: string, managedBy: string): void {
    const updatedLog = {
      ...log, 
      status: updatedStatus,
      managedBy: managedBy 
    };

  
    this.supplyLogService.updateSupplyLog(log.logId, updatedLog).subscribe({
      next: (resp) => {
        
        this.originalStatus[log.logId] = resp.status;
        this.editedStatus[log.logId] = resp.status;
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.errorMessage = null;
        this.loadLogs(); 
      },
      error: () => {
        this.errorMessage = 'Failed to update the log.';
        this.editedStatus[log.logId] = this.originalStatus[log.logId]; 
      }
    });
  }

  
  clearError(): void 
  {
    this.errorMessage = null;
  }
}
