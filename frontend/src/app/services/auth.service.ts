// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000/api/auth'; // ✅ Make sure backend is running

//   constructor(private http: HttpClient) {}

//   // Register User
//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   // Login User
//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPassword,ValidateOtp,ResetPassword } from '../models/forgot-password';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}



  // Register method for both Doctor and Patient
  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Login method for both Doctor and Patient
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  sendOtp(data: ForgotPassword): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

  validateOtp(data: ValidateOtp): Observable<any> {
    return this.http.post(`${this.baseUrl}/validate-otp`, data);
  }

  resetPassword(data: ResetPassword): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }
}
