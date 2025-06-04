import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HospitalUserService } from '../services/hospital-user.service';
import { AdminSupplyLogService, SupplyLog } from '../services/admin-supply-log.service';

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
 
    // search
    filteredLogs: SupplyLog[] = [];
    searchQuery: string = '';
    toggleStatuses: string[] = ['ALL', 'UNCONFIRMED', 'IN-TRANSIT', 'DELIVERED'];
    selectedToggle: string = 'ALL';

    filterLogs(): void
  {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredLogs = this.logs.filter(log =>
    {
      const matchesSearch =
        log.hospitalMail.toLowerCase().includes(query) ||
        log.bloodGroup.toLowerCase().includes(query);

      const matchesStatus =
        this.selectedToggle === 'ALL' || log.status === this.selectedToggle;

      return matchesSearch && matchesStatus;
    });
  }

  onToggleStatus(status: string): void
  {
    this.selectedToggle = status;
    this.filterLogs();
  }

    //search end

    private bloodApiBase = 'http://localhost:8080/admin/blood';
 
    constructor(private supplyLogService: AdminSupplyLogService, private http: HttpClient) {}
 
    ngOnInit(): void 
    {
        this.loadLogs(); 
    }
 
    loadLogs(): void {
        this.supplyLogService.getAllSupplyLogs().subscribe(
            {
                next: data => 
                    {
                        const urgentLogs = data.filter(log => log.urgent === true);
                        this.logs = urgentLogs.sort((a, b) => b.logId - a.logId);
                        this.filteredLogs = [...this.logs];

                        // Initialize status trackers
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
 
   
    async onStatusChange(logId: number, newStatus: string): Promise<void> 
    {
        if (newStatus === 'IN-TRANSIT') 
        {
            const log = this.logs.find(l => l.logId === logId); 
            if (!log) return;

            try 
            {
                // Encode bloodGroup to handle special chars like '+'
                const encodedBloodGroup = encodeURIComponent(log.bloodGroup);

                
                const blood = await this.http.get<{ availableUnits: number }>( `${this.bloodApiBase}/check?group=${encodedBloodGroup}`).toPromise();

                
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

            } 
            catch (error) 
            {
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
 
   
    onCancel(logId: number): void 
    {
        this.editedStatus[logId] = this.originalStatus[logId];
    }
 
  
    onConfirm(log: SupplyLog): void 
    {
        const updatedStatus = this.editedStatus[log.logId];

        // Skip update if status hasn't changed
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

            
            this.http.put(`${this.bloodApiBase}/reduce`, reduceRequest).subscribe
            (
                {
                    next: () => 
                        {
                            
                            this.updateSupplyLogStatus(log, updatedStatus, managedBy);
                        },
                    error: (err) =>
                         {
                            alert(`Failed to reduce inventory: ${err.error || 'Unknown error'}`);
                            this.editedStatus[log.logId] = this.originalStatus[log.logId]; 
                         }
                }
            );
        } 
        else 
        {
            
            this.updateSupplyLogStatus(log, updatedStatus, managedBy);
        }
    }
 
    
    private updateSupplyLogStatus(log: SupplyLog, updatedStatus: string, managedBy: string): void
     {
        const updatedLog = 
        {
            ...log, 
            status: updatedStatus,
            managedBy: managedBy, 
            urgent: updatedStatus === 'DELIVERED' ? false : log.urgent 
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
                    this.loadLogs(); 
                 },
            error: () => 
                {
                    this.errorMessage = 'Failed to update the log.';
                    this.editedStatus[log.logId] = this.originalStatus[log.logId]; 
                }
         }
        );
    }
 
    clearError(): void 
    {
        this.errorMessage = null;
    }
}
