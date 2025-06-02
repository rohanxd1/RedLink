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
}

export interface SupplyLogDto 
{
  hospitalMail: string;
  bloodGroup: string;
  unitsRequired: number;
  dateOfRequest: string;
  dateOfTransit: string;
  dateOfDelivery: string;
  status: string;
  managedBy: string;
}


@Injectable({
  providedIn: 'root'
})
export class UrgentlogsService 
{ 


  constructor(private http:HttpClient) { }

  createSupplyLog(log: SupplyLogDto): Observable<SupplyLog> 
  {
    return this.http.post<SupplyLog>(`http://localhost:8080/urgentlogs/create`, log, { withCredentials: true });
  }

  getAllSupplyLogs(): Observable<SupplyLog[]> {
    return this.http.get<SupplyLog[]>(`http://localhost:8080/urgentlogs/view-all`, { withCredentials: true });
  }

  updateSupplyLog(id: number, updatedLog: SupplyLog): Observable<SupplyLog> 
  {
    return this.http.put<SupplyLog>(`http://localhost:8080/urgentlogs/update/${id}`, updatedLog, { withCredentials: true });
  }

}
