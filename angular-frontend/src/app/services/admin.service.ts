import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface adminEntity
{
  adminName:string,
  adminMail:string,
  adminPassword:string
}
export interface AdminLoginRequest {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

   private baseUrl = 'http://localhost:8080/admin';
  createAdmin(admin:adminEntity):Observable<adminEntity>
  {
    return this.http.post<adminEntity>('http://localhost:8080/admin/create',admin,);
  }

  loginAdmin(loginRequest: AdminLoginRequest): Observable<adminEntity> 
  {
    return this.http.post<adminEntity>(`${this.baseUrl}/login`, loginRequest, {withCredentials: true});
  }

}
