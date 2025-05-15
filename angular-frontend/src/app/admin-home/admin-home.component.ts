import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent 
{

   currentView: 'inventory' | 'donors' | 'hospitals' | 'logs' = 'inventory';

  // Function to set the current view on navbar click
  showView(view: 'inventory' | 'donors' | 'hospitals' | 'logs') 
  {
    this.currentView = view;
  }

}
