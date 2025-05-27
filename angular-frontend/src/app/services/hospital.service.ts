import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  // view hospitals
  getAllHospitals(): Observable<HospitalDto[]> 
    {
    return this.http.get<HospitalDto[]>(`http://localhost:8080/admin/hospitals/view-all`);
    }

  // creaye hospital method
    createHospital(hospital: HospitalEntity): Observable<HospitalDto>
    {
      return this.http.post<HospitalDto>('http://localhost:8080/admin/hospitals/create',hospital);
    }

    // update hosp
     updateHospital(hospId: number,hospital: HospitalDto): Observable<HospitalDto>
      {
        return this.http.put<HospitalDto>(`http://localhost:8080/admin/hospitals/update/${hospId}`,hospital);
      }

      // delete hosp
      deleteHospital(hospId: number)
      {
        return this.http.delete(`http://localhost:8080/admin/hospitals/delete/${hospId}`,{ responseType: 'text' });
      }
     
      // search Hisp
        findHospital(hospId:number): Observable<HospitalDto>
        {
          return this.http.get<HospitalDto>(`http://localhost:8080/admin/hospitals/${hospId}`);
        }
}
