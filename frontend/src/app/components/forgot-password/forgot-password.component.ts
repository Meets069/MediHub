import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step: number = 1; // 1: Email, 2: OTP, 3: Reset Password

  email: string = '';
  otp: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  // Send OTP
  sendOtp() {
    this.authService.sendOtp({ email: this.email }).subscribe(response => {
      alert(response.message);
      this.step = 2;
    }, error => {
      alert(error.error.message);
    });
  }

  // Validate OTP
  validateOtp() {
    this.authService.validateOtp({ email: this.email, otp: this.otp }).subscribe(response => {
      alert(response.message);
      this.step = 3;
    }, error => {
      alert(error.error.message);
    });
  }

  // Reset Password
  resetPassword() {
    this.authService.resetPassword({ email: this.email, password: this.password }).subscribe(response => {
      alert(response.message);
      this.step = 1;
      this.clearForm();
      this.router.navigate(['/login']); // Redirect to login page
    }, error => {
      alert(error.error.message);
    });
  }

  clearForm() {
    this.email = '';
    this.otp = '';
    this.password = '';
  }
}
