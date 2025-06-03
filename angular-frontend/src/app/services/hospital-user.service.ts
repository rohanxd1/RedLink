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


export interface SupplyLog 
{
  logId?: number;
  hospitalMail: string;
  bloodGroup: string;
  unitsRequired: number;
  dateOfRequest: string;
  dateOfTransit: string;
  dateOfDelivery: string;
  status: string;
  managedBy: string;
  urgent:boolean;
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

    updateProfile(id: number, updatedHospital: HospitalEntity): Observable<HospitalEntity> 
    {
      return this.http.put<HospitalEntity>(`http://localhost:8080/hospitaluser/updateprofile/${id}`, updatedHospital);
    }


    createSupplyLog(supplyLog: SupplyLog): Observable<SupplyLog> 
    {
      return this.http.post<SupplyLog>('http://localhost:8080/supplylogs/create',supplyLog,{ withCredentials: true });
    }





    viewHospitalLogs(mail: string): Observable<SupplyLog[]> 
    {
      return this.http.get<SupplyLog[]>(`http://localhost:8080/supplylogs/hospitallogs/${mail}`, {withCredentials: true});
    }

    updateHospitalLog(log: SupplyLog): Observable<SupplyLog>
    {
      return this.http.put<SupplyLog>('http://localhost:8080/supplylogs/updatehospitallog',log,{ withCredentials: true });
    }

    viewProfile(mail:string):Observable<HospitalEntity>
    {
      return this.http.get<HospitalEntity>(`http://localhost:8080/hospitaluser/profile`,{ params: {mail} ,withCredentials: true });
    }

    changePassword(mail: string, newPassword: string): Observable<HospitalEntity> 
    {
    return this.http.put<HospitalEntity>(
      `http://localhost:8080/hospitaluser/changepassword?mail=${encodeURIComponent(mail)}&newPassword=${encodeURIComponent(newPassword)}`, null);
    }
    
}
