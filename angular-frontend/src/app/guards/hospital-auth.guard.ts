import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HospitalAuthGuard implements CanActivate 
{
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree
   {
    const hospitalEmail = localStorage.getItem('hospitalEmail');
    if (hospitalEmail) 
    {
      return true;
    } else 
    {
      return this.router.createUrlTree(['/hospitaluserlogin']);
    }
  }
}
