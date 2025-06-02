import { Component, OnInit } from '@angular/core';
import { SupplyLog, UrgentlogsService } from '../services/urgentlogs.service';
import { HttpClient } from '@angular/common/http';
import { HospitalUserService } from '../services/hospital-user.service';

@Component({
  selector: 'app-urgentlogs',
  standalone: false,
  templateUrl: './urgentlogs.component.html',
  styleUrl: './urgentlogs.component.css'
})
export class UrgentlogsComponent implements OnInit 
{
  logs: SupplyLog[] = [];  
  originalStatus: { [logId: number]: string } = {};  
  editedStatus: { [logId: number]: string } = {};    
  showSuccessMessage = false; 
  errorMessage: string | null = null; 

  private bloodApiBase = 'http://localhost:8080/admin/blood';

  constructor(private supplyLogService: UrgentlogsService,private hospitalUserService:HospitalUserService, private http: HttpClient) {}

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
          // Initialize status trackers -> use cheyyal when change happen
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
        const log = this.logs.find(l => l.logId === logId); // Find the relevant log
        if (!log) return;

        try {
          //check available units for this blood group
          const blood = await this.http.get<{ availableUnits: number }>(`${this.bloodApiBase}/check?group=${log.bloodGroup}`).toPromise();

          // Handle missing or wrong responses
          if (!blood || typeof blood.availableUnits !== 'number') 
          {
            alert('Could not retrieve blood inventory.');
            this.editedStatus[logId] = this.originalStatus[logId]; // Revert UI
            return;
          }

          // Show alert if available units are less than required
          if (blood.availableUnits < log.unitsRequired)
             {
                alert(`Insufficient units. Available = ${blood.availableUnits} units.`);
                this.editedStatus[logId] = this.originalStatus[logId]; // Revert UI
                return;
             }

          // Sufficient units: allow the change
          this.editedStatus[logId] = newStatus;

        } 
        catch (error) 
        {
          alert('Error checking blood inventory.');
          this.editedStatus[logId] = this.originalStatus[logId]; // Revert UI
        }
      }
      else 
      {
        
        this.editedStatus[logId] = newStatus;
      }
  }

  // Returns true if current status is different from original (i.e., editable)
  canCancel(logId: number): boolean 
  {
    return this.editedStatus[logId] !== this.originalStatus[logId];
  }

  // Reverts the edited status back to the original
  onCancel(logId: number): void {
    this.editedStatus[logId] = this.originalStatus[logId];
  }

  /**
   * Called when the 'Confirm' button is clicked.
   * Updates status and handles inventory reduction if required.
   */
  onConfirm(log: SupplyLog): void 
  {
    const updatedStatus = this.editedStatus[log.logId];

    // Skip update if status hasn't changed
    if (updatedStatus === this.originalStatus[log.logId]) {
      return;
    }

    const managedBy = localStorage.getItem('adminEmail') || ''; // Get admin email

    // If status is being set to IN-TRANSIT, reduce inventory first
    if (updatedStatus === 'IN-TRANSIT') {
      const reduceRequest = {
        bloodGroup: log.bloodGroup,
        unitsToReduce: log.unitsRequired
      };

      // Call API to reduce blood inventory
      this.http.put(`${this.bloodApiBase}/reduce`, reduceRequest).subscribe({
        next: () => {
          // After reducing inventory, update the supply log
          this.updateSupplyLogStatus(log, updatedStatus, managedBy);
        },
        error: (err) => {
          alert(`Failed to reduce inventory: ${err.error || 'Unknown error'}`);
          this.editedStatus[log.logId] = this.originalStatus[log.logId]; // Revert UI
        }
      });
        }  
        else if (updatedStatus === 'DELIVERED') 
          {
           
            this.updateSupplyLogStatus(log, updatedStatus, managedBy);

            // Save to hospitallogs
            const supplyLogCopy = { ...log, status: updatedStatus, managedBy }; 
            this.hospitalUserService.createSupplyLog(supplyLogCopy).subscribe({
              next: () => {
                console.log('Supply log saved to hospital side.');
              },
              error: (err) => {
                console.error('Failed to save log to hospital side:', err);
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
      ...log, // Spread existing log data
      status: updatedStatus,
      managedBy: managedBy // Track who changed the status
    };

    // Send updated log to backend
    this.supplyLogService.updateSupplyLog(log.logId, updatedLog).subscribe({
      next: (resp) => {
        // Update UI state to reflect changes
        this.originalStatus[log.logId] = resp.status;
        this.editedStatus[log.logId] = resp.status;
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000); // Hide success message after 3s
        this.errorMessage = null;
        this.loadLogs(); // Reload all logs to refresh data
      },
      error: () => {
        this.errorMessage = 'Failed to update the log.';
        this.editedStatus[log.logId] = this.originalStatus[log.logId]; // Revert status
      }
    });
  }

  
  clearError(): void 
  {
    this.errorMessage = null;
  }

}
