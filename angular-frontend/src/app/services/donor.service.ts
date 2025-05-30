import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DonorDto {
  donorId?: number;
  donorName: string;
  donorGroup: string;
  donorPh: string;
  donorMail: string;
  donorAddress: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private baseUrl = 'http://localhost:8080/admin/donors';  // backend API base URL

  constructor(private http: HttpClient) { }

  // view all method
  getAllDonors(): Observable<DonorDto[]> 
  {
  return this.http.get<DonorDto[]>(`http://localhost:8080/admin/donors/view-all`,{ withCredentials: true });
  }

  // creaye donor method
  createDonor(donor: DonorDto): Observable<DonorDto>
  {
    return this.http.post<DonorDto>('http://localhost:8080/admin/donors/create',donor,{ withCredentials: true });
  }

  // delete donor method
  deleteDonor(donorId: number) {
  return this.http.delete(`http://localhost:8080/admin/donors/delete/${donorId}`,{ withCredentials: true });
}

  // update donor
  updateDonor(donorId: number,donor: DonorDto): Observable<DonorDto>
  {
    return this.http.put<DonorDto>(`http://localhost:8080/admin/donors/update/${donorId}`,donor,{ withCredentials: true });
  }

  // search donor
  findDonor(donorId:number): Observable<DonorDto>
  {
    return this.http.get<DonorDto>(`http://localhost:8080/admin/donors/${donorId}`,{ withCredentials: true });
  }

}
