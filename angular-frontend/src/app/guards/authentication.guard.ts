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
      
      return true;
    } 
    else
    {
      
      return this.router.createUrlTree(['/adminlogin']);
    }
  }
}
