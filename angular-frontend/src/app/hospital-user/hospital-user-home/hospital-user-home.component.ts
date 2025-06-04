import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-user-home',
  standalone: false,
  templateUrl: './hospital-user-home.component.html',
  styleUrl: './hospital-user-home.component.css'
})
export class HospitalUserHomeComponent 
{
  constructor(private router: Router) {}
   currentView:  'request' | 'profile' | 'logs' = 'profile';

  
  showView(view: 'request' | 'profile' | 'logs') 
  {
    this.currentView = view;
  }

  hospitalEmail: string | null = null;
// getting this from admin login
  ngOnInit(): void 
  {
    this.hospitalEmail = localStorage.getItem('hospitalEmail');
    if (!this.hospitalEmail) {
      this.router.navigate(['/hospitaluserlogin']); 
    }
  }

  hovering = false;
  
  dropdownOpen = false;


  logout(): void
  {
    this.dropdownOpen = false;  // close dropdown on logout
    localStorage.removeItem('hospitalEmail');
    this.hospitalEmail = null;
    this.router.navigate(['/hospitaluserlogin']);
  }
}
