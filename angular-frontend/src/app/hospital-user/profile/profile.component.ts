import { Component, OnInit } from '@angular/core';
import { HospitalDto, HospitalUserService } from '../../services/hospital-user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit 
{ 
  constructor(private hospitaluserservice: HospitalUserService) {}
  profile!: HospitalDto;
  errorMessage: string = '';

  ngOnInit(): void {
      this.loadProfile();
  }

 loadProfile() 
 {
    const mail = localStorage.getItem('hospitalEmail');
    if (mail) 
      {
        this.hospitaluserservice.viewProfile(mail).subscribe
        ( {
            next: (data) => 
              {
                this.profile = data;
              },
            error: () => 
                {
                  this.errorMessage = 'User not found';
                }
          }
        );
      } 
      else 
      {
        this.errorMessage = 'No email found in local storage';
      }
 }
}
