import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Appointment {
  _id?: string;
  name: string;
  email: string;
  date: string;
  time: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:5000/api/appointment';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    console.log('Fetching appointments...');
    return this.http.get<Appointment[]>(this.apiUrl).pipe(
      tap(data => console.log('Appointments fetched:', data)),
      catchError(this.handleError)
    );
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log('Sending appointment:', appointment);
    return this.http.post<Appointment>(this.apiUrl, appointment).pipe(
      tap(data => console.log('Appointment created:', data)),
      catchError(this.handleError)
    );
  }

  updateAppointment(id: string, appointment: Appointment): Observable<Appointment> {
    console.log(`Updating appointment with ID: ${id}`, appointment);
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment).pipe(
      tap(data => console.log('Appointment updated:', data)),
      catchError(this.handleError)
    );
  }

  deleteAppointment(id: string): Observable<any> {
    console.log(`Deleting appointment with ID: ${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Appointment deleted:', id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
