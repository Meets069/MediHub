// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Appointment {
//   _id?: string;
//   doctorName: string;
//   specialization: string;
//   name: string;
//   email?: string; // Made email optional to fix TypeScript error
//   date?: string;
//   time?: string;
//   description?: string;
//   status?: string; // Added status field to support approval/rejection
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AppointmentService {
//   private apiUrl = 'http://localhost:5000/api/appointment';

//   constructor(private http: HttpClient) {}

//   getAppointments(): Observable<Appointment[]> {
//     return this.http.get<Appointment[]>(this.apiUrl);
//   }

//   getAppointmentById(id: string): Observable<Appointment> {
//     return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
//   }

//   createAppointment(appointment: Appointment): Observable<Appointment> {
//     return this.http.post<Appointment>(this.apiUrl, appointment);
//   }

//   // ✅ Changed to PATCH for partial updates
//   // updateAppointment(id: string, updateData: Partial<Appointment>): Observable<Appointment> {
//   //   return this.http.patch<Appointment>(`${this.apiUrl}/${id}`, updateData);
//   // }

//   deleteAppointment(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
  

// // updateAppointment(id: string, updateData: Partial<Appointment>): Observable<Appointment> {
// //   return this.http.put<Appointment>(`${this.apiUrl}/${id}`, updateData);
// // }
// updateAppointment(id: string, updateData: Partial<Appointment>): Observable<Appointment> {
//   return this.http.put<Appointment>(`${this.apiUrl}/${id}`, updateData);
// }



// // Update only the appointment status
// updateAppointmentStatus(id: string, status: string): Observable<Appointment> {
//   return this.http.patch<Appointment>(`${this.apiUrl}/${id}/status`, { status });
// }



//   getAppointmentsByDate(date: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}?date=${date}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Appointment {
  _id?: string;
  doctorName: string;
  specialization: string;
  name: string;
  email?: string; // Made email optional to fix TypeScript error
  date?: string;
  time?: string;
  description?: string;
  status?: string; // Added status field to support approval/rejection
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:5000/api/appointment';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  // ✅ Changed to PATCH for partial updates
  // updateAppointment(id: string, updateData: Partial<Appointment>): Observable<Appointment> {
  //   return this.http.patch<Appointment>(`${this.apiUrl}/${id}`, updateData);
  // }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  

// updateAppointment(id: string, updateData: Partial<Appointment>): Observable<Appointment> {
//   return this.http.put<Appointment>(`${this.apiUrl}/${id}`, updateData);
// }
updateAppointment(id: string, updateData: Partial<Appointment>): Observable<Appointment> {
  return this.http.put<Appointment>(`${this.apiUrl}/${id}`, updateData);
}



// Update only the appointment status
updateAppointmentStatus(id: string, status: string): Observable<Appointment> {
  return this.http.patch<Appointment>(`${this.apiUrl}/${id}/status`, { status });
}



  getAppointmentsByDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?date=${date}`);
  }
}

