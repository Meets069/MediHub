import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        if (response.token && response.userType) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', response.userType);
          localStorage.setItem('userEmail', this.email);

          alert('Login successful');

          // Redirect based on user type
          if (response.userType === 'Doctor') {
            this.router.navigate(['/doctor-dashboard']);
          } else if (response.userType === 'Patient') {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Unknown user type';
          }
        } else {
          this.errorMessage = 'Login failed: Invalid response';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}