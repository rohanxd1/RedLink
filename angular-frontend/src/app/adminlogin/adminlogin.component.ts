import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { adminEntity, AdminLoginRequest, AdminService } from '../services/admin.service';

@Component({
  selector: 'app-adminlogin',
  standalone: false,
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent 
{
  
 

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router,private adminService: AdminService) {}


  // create admin struff
    newAdmin:adminEntity=
    {
      adminName:'',
      adminMail:'',
      adminPassword:''
    };


    showRegOverlay=false;
    
    onRegister()
    {
     this.showRegOverlay=true;
    }
    cancelReg()
    {
      this.showRegOverlay=false;
    }
    createErrorOverlay=false;
    createError='';
    showCreateSuccessMessage=false;
    createAdmin()
    {
      if (
                !this.newAdmin.adminName?.trim() ||
                !this.newAdmin.adminMail?.trim() ||
                !this.newAdmin.adminPassword?.trim() 
                
           ) 
           {
              this.createError = 'All fields are required.';
              this.createErrorOverlay = true;
              return;
           }
           this.adminService.createAdmin(this.newAdmin).subscribe(
          {
             next: () => {
                          this.createErrorOverlay = false;
                        
                          this.cancelReg();
                          this.showCreateSuccessMessage = true;
                          setTimeout(() => this.showCreateSuccessMessage = false, 3000);
                          this.newAdmin = {
                                                adminName:'',
                                                adminMail:'',
                                                adminPassword:''
                                             };
                         },
              error: () => {
                            this.createError = "Failed to create admin";
                            this.createErrorOverlay = true;
                           }
          });
    }

  // create admin over

  // login admin start

    adminEmail: string | null = null;

  ngOnInit() {
    this.adminEmail = localStorage.getItem('adminEmail');
  }

   loginData : AdminLoginRequest = {
    email: '',
    password: ''  
  };

  onLogin(): void 
  {
       console.log(this.loginData.email);
       console.log(this.loginData.password);

      const loginUrl = 'http://localhost:8080/admin/login'; 

      this.adminService.loginAdmin(this.loginData).subscribe
      ({
             next: (response) => {
                                      console.log('Login successful', response);
                                       localStorage.setItem('adminEmail', this.loginData.email);
                                      this.router.navigate(['/adminhome']);
                                 },
              error: (error) => {
                                  console.error('Login failed', error);
                                  this.errorMessage = 'Invalid email or password';
                                }
       });


  }

  onCancel(): void 
  {
    this.loginData = { email: '', password: '' };
    this.errorMessage = '';
  }

}
