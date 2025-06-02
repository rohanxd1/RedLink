import { Component } from '@angular/core';
import { HospitalUserService, SupplyLog } from '../../services/hospital-user.service';
import { SupplyLogDto, UrgentlogsService } from '../../services/urgentlogs.service';

@Component({
  selector: 'app-request-blood',
  standalone: false,
  templateUrl: './request-blood.component.html',
  styleUrl: './request-blood.component.css'
})
export class RequestBloodComponent 
{

   bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  showSuccessMessage=false;
  selectedBloodGroup: string = '';
  unitsRequired: number | null = null;
  urgent: boolean = false;

  constructor(private hospitalUserService: HospitalUserService,private urgentLogsService:UrgentlogsService) {}



  isFormValid(): boolean 
  {
  return !!this.selectedBloodGroup && !!this.unitsRequired && this.unitsRequired > 0;
  }


  onSubmit() 
  {
    // Get hospital email from localStorage
    const hospitalMail = localStorage.getItem('hospitalEmail') || '';

    if (!hospitalMail) 
    {
      alert('Hospital email not found. Please login.');
      return;
    }

    
    if (!this.selectedBloodGroup || !this.unitsRequired || this.unitsRequired <= 0) 
    {
      alert('Please fill all required fields correctly.');
      return;
    }

    const supplyLog: SupplyLog = 
    {
      hospitalMail: hospitalMail,
      bloodGroup: this.selectedBloodGroup,
      unitsRequired: this.unitsRequired,
      dateOfRequest: new Date().toISOString(), // current timestamp
      dateOfTransit: 'UNCONFIRMED',
      dateOfDelivery: 'UNCONFIRMED',
      status: 'UNCONFIRMED',
      managedBy: 'UNCONFIRMED'
    };

    const supplyLogDto: SupplyLogDto=
    {
      hospitalMail: hospitalMail,
      bloodGroup: this.selectedBloodGroup,
      unitsRequired: this.unitsRequired,
      dateOfRequest: new Date().toISOString(), // current timestamp
      dateOfTransit: 'UNCONFIRMED',
      dateOfDelivery: 'UNCONFIRMED',
      status: 'UNCONFIRMED',
      managedBy: 'UNCONFIRMED'
    }

        if (!this.urgent) 
          {
            
            this.hospitalUserService.createSupplyLog(supplyLog).subscribe(
            {
                next: (savedLog) => 
                  {
                    this.showSuccessMessage=true;
                    setTimeout(() => this.showSuccessMessage = false, 3000);
                    this.resetForm();
                  },
              error: (err) => 
                {
                  alert('Failed to create supply log.');
                  console.error(err);
                }
            });
          } 
          else 
          {
            this.urgentLogsService.createSupplyLog(supplyLogDto).subscribe(
            {
                next: (savedLog) => 
                  {
                    this.showSuccessMessage=true;
                    setTimeout(() => this.showSuccessMessage = false, 3000);
                    this.resetForm();
                  },
              error: (err) => 
                {
                  alert('Failed to create supply log.');
                  console.error(err);
                }
            });
          }

  }

  resetForm() 
  {
    this.selectedBloodGroup = '';
    this.unitsRequired = null;
    this.urgent = false;
  }

}
