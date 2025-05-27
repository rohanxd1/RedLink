import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  standalone: false,
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent 
{

  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void 
  {
      //  console.log(this.loginData.email);
      //  console.log(this.loginData.password);
  }

  onCancel(): void 
  {
    this.loginData = { email: '', password: '' };
    this.errorMessage = '';
  }

}
