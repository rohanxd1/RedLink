import { Component, OnInit } from '@angular/core';
import { HospitalUserService, SupplyLog } from '../../services/hospital-user.service';

@Component({
  selector: 'app-hospital-logs',
  standalone: false,
  templateUrl: './hospital-logs.component.html',
  styleUrl: './hospital-logs.component.css'
})
export class HospitalLogsComponent implements OnInit {

  hospitalMail = localStorage.getItem('hospitalEmail');
  logs: SupplyLog[] = [];
  editableLogs: any[] = []; 
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  showSuccessMessage = false;
  errorMessage: string | null = null;

  clearError(): void {
    this.errorMessage = null;
  }


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
  
    // search end

  constructor(private hospitaluserservice: HospitalUserService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    if (this.hospitalMail != null) {
      this.hospitaluserservice.viewHospitalLogs(this.hospitalMail).subscribe({
        next: (data) => {
          // Sort logs so newest dateOfRequest is first
          this.logs = data.sort((a, b) => {
            const dateA = new Date(a.dateOfRequest);
            const dateB = new Date(b.dateOfRequest);
            return dateB.getTime() - dateA.getTime();
          });
          this.editableLogs = this.logs.map(log => ({ ...log }));
          this.errorMessage = null;
          this.filteredLogs = [...this.logs];
        },
        error: (err) => {
          this.logs = [];
          this.editableLogs = [];
          this.errorMessage = 'No logs found or an error occurred.';
          console.error(err);
        }
      });
    }
  }

  hasChanges(index: number): boolean {
    const original = this.logs[index];
    const edited = this.editableLogs[index];
    return original.bloodGroup !== edited.bloodGroup || original.unitsRequired !== edited.unitsRequired;
  }

  confirmChanges(index: number): void {
    const updatedLog = this.editableLogs[index];

    this.hospitaluserservice.updateHospitalLog(updatedLog).subscribe({
      next: (response) => {
        this.logs[index] = { ...response };
        this.editableLogs[index] = { ...response };
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to update the log. Please try again.';
      }
    });
  }

  cancelChanges(index: number): void {
    this.editableLogs[index] = { ...this.logs[index] }; 
  }
}
