import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SupplyLog 
{
  logId: number;
  hospitalMail: string;
  bloodGroup: string;
  unitsRequired: number;
  dateOfRequest: string;
  dateOfTransit: string;
  dateOfDelivery: string;
  status: string;
  managedBy: string;
  urgent:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AdminSupplyLogService 
{

  private baseUrl = 'http://localhost:8080/supplylogs'; // adjust if needed

  constructor(private http: HttpClient) {}

  // Get all supply logs
  getAllSupplyLogs(): Observable<SupplyLog[]> 
  {
    return this.http.get<SupplyLog[]>(`${this.baseUrl}/view-all`);
  }

  // Update supply log by ID
  updateSupplyLog(id: number, log: Partial<SupplyLog>): Observable<SupplyLog> 
  {
    return this.http.put<SupplyLog>(`${this.baseUrl}/update/${id}`, log);
  }

  // (Optional) Get logs for a specific hospital
  getLogsByHospitalMail(mail: string): Observable<SupplyLog[]> 
  {
    return this.http.get<SupplyLog[]>(`${this.baseUrl}/hospitallogs?mail=${mail}`);
  }
}
