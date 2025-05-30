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
   currentView: 'inventory' | 'donors' | 'hospitals' | 'logs' = 'inventory';

  // Function to set the current view on navbar click
  showView(view: 'inventory' | 'donors' | 'hospitals' | 'logs') 
  {
    this.currentView = view;
  }

  adminEmail: string | null = null;
// getting this from admin login
  ngOnInit(): void 
  {
    this.adminEmail = localStorage.getItem('adminEmail');
    if (!this.adminEmail) {
      this.router.navigate(['/adminlogin']); 
    }
  }

  hovering = false;
  



  logout(): void 
  {
      localStorage.removeItem('adminEmail');
      this.adminEmail = null; 
      this.router.navigate(['/adminlogin']);
  }


}
