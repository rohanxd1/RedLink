import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent 
{
  constructor(private router: Router) {}
   currentView: 'inventory' | 'donors' | 'hospitals' | 'logs'|'urgentlogs' = 'inventory';

  
  showView(view: 'inventory' | 'donors' | 'hospitals' | 'logs'|'urgentlogs') 
  {
    this.currentView = view;
  }

  adminEmail: string | null = null;

  ngOnInit(): void 
  {
    this.adminEmail = localStorage.getItem('adminEmail');
    if (!this.adminEmail) {
      this.router.navigate(['/adminlogin']); 
    }
  }

  hovering = false;
  dropdownOpen = false;





  logout(): void
  {
    this.dropdownOpen = false;  // close dropdown on logout
    localStorage.removeItem('adminEmail');
    this.adminEmail = null;
    this.router.navigate(['/adminlogin']);
  }

}
