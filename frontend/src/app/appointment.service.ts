import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Appointment {
  _id?: string;
  doctorName: string;
  specialization: string;
  name: string;
  email: string;
  date?: string;
  time?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: any[] = []; // Store booked appointments
  private apiUrl = 'http://localhost:5000/api/appointment';

  constructor(private http: HttpClient) {}

  getAppointments2(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }


  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  updateAppointment2(id: string, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }
  // Add new appointment
  addAppointment(appointment: any) {
    this.appointments.push(appointment);
  }

  // Get all appointments
  getAppointments() {
    return this.appointments;
  }

  // Update an existing appointment
  updateAppointment(index: number, updatedAppointment: any) {
    this.appointments[index] = updatedAppointment;
  }

  // Delete an appointment
  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
  }

  
  
}
