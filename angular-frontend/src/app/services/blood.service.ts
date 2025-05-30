import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Blood
{
  
    
        bloodId?: number;
        bloodGroup: string;
        availableUnits: number;
    
}

@Injectable({
  providedIn: 'root'
})
export class BloodService
{
  private baseUrl = 'http://localhost:8080/admin/blood';
  constructor(private http:HttpClient) {}
  
      getAllBlood(): Observable<Blood[]> 
        {
          return this.http.get<Blood[]>(`http://localhost:8080/admin/blood/view-all`,{ withCredentials: true });
        }
        
        // update by group
        updateBloodUnits(blood: Blood): Observable<Blood> 
        {
          return this.http.put<Blood>(`http://localhost:8080/admin/blood/update-units`, blood,{ withCredentials: true });
        }
  
}
