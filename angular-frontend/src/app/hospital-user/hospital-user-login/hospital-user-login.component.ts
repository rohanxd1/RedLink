import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HospitalEntity, HospitalUserLoginRequest, HospitalUserService } from '../../services/hospital-user.service';

@Component({
  selector: 'app-hospital-user-login',
  standalone: false,
  templateUrl: './hospital-user-login.component.html',
  styleUrl: './hospital-user-login.component.css'
})
export class HospitalUserLoginComponent 
{
  constructor(private http: HttpClient, private router: Router,private hospitalUserService: HospitalUserService) {}
  errorMessage: string = '';
  
  //register hosital user start
  newHospital:HospitalEntity=
      {
        hospitalName: '',
        hospitalCoordinator:'',
        hospitalPassword:'',
        hospitalPh: '',
        hospitalMail: '',
        hospitalAddress: ''
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

    createhospital()
    {
      if (
                !this.newHospital.hospitalName?.trim() ||
                !this.newHospital.hospitalCoordinator?.trim() ||
                !this.newHospital.hospitalPassword?.trim() ||
                !this.newHospital.hospitalPh?.trim() ||
                !this.newHospital.hospitalMail?.trim()||
                !this.newHospital.hospitalAddress?.trim()
                
           ) 
           {
              this.createError = 'All fields are required.';
              this.createErrorOverlay = true;
              return;
           }
           this.hospitalUserService.registerHospital(this.newHospital).subscribe(
          {
             next: () => {
                          this.createErrorOverlay = false;
                        
                          this.cancelReg();
                          this.showCreateSuccessMessage = true;
                          setTimeout(() => this.showCreateSuccessMessage = false, 3000);
                          this.newHospital = {
                                                hospitalName: '',
                                                hospitalCoordinator:'',
                                                hospitalPassword:'',
                                                hospitalPh: '',
                                                hospitalMail: '',
                                                hospitalAddress: ''
                                             };
                         },
              error: () => {
                            this.createError = "Failed to create hospital";
                            this.createErrorOverlay = true;
                           }
          });
    }
  //register hosital user end 

  // login user start
  
      hospitalEmail: string | null = null;
  
    ngOnInit() {
      this.hospitalEmail = localStorage.getItem('hospitalEmail');
    }
  
     loginData : HospitalUserLoginRequest= {
      email: '',
      password: ''  
    };
  
    onLogin(): void 
    {
         console.log(this.loginData.email);
         console.log(this.loginData.password);
  
        const loginUrl = 'http://localhost:8080/hospitaluser/login'; 
  
        this.hospitalUserService.loginHospital(this.loginData).subscribe
        ({
               next: (response) => {
                                        console.log('Login successful', response);
                                         localStorage.setItem('hospitalEmail', this.loginData.email);
                                        this.router.navigate(['/hospitaluserhome']);
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
