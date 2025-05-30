import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate 
{
  
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree 
  {
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail) 
    {
      // Admin is logged in
      return true;
    } 
    else
    {
      // Not logged in, redirect to login page
      return this.router.createUrlTree(['/adminlogin']);
    }
  }
}
