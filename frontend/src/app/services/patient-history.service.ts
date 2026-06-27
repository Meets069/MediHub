import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientHistoryService {
  private apiUrl = 'http://localhost:5000/api/patient-history'; // Ensure this matches backend

  constructor(private http: HttpClient) {}

  getAllHistories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addHistory(history: any): Observable<any> {
    return this.http.post(this.apiUrl, history);
  }

  updateHistory(id: string, history: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, history);
  }

  deleteHistory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
