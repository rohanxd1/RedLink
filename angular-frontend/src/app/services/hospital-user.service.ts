import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface HospitalDto 
{
  hospitalId?: number;
  hospitalName: string;
  hospitalCoordinator: string;
  hospitalPh: string;
  hospitalMail: string;
  hospitalAddress: string;
}
export interface HospitalEntity
{
  hospitalId?: number;
  hospitalName: string;
  hospitalCoordinator: string;
  hospitalPassword:string;
  hospitalPh: string;
  hospitalMail: string;
  hospitalAddress: string;
}

export interface HospitalUserLoginRequest {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class HospitalUserService {

  constructor(private http:HttpClient) { }

  registerHospital(hospital: HospitalEntity): Observable<HospitalDto>
      {
        return this.http.post<HospitalDto>('http://localhost:8080/hospitaluser/register',hospital,{ withCredentials: true });
      }

  loginHospital(loginRequest: HospitalUserLoginRequest): Observable<HospitalDto> 
    {
      return this.http.post<HospitalDto>(`http://localhost:8080/hospitaluser/login`, loginRequest, {withCredentials: true});
    }
    
}
