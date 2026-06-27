import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  userType = '';  // Holds the selected user type
  specialization = ''; // For Doctors
  age: number | null = null; // For Patients
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Basic validation
    if (!this.name || this.name.length < 3 || this.name.length > 20) {
      this.errorMessage = 'Name must be between 3 and 20 characters.';
      return;
    }

    if (!this.email.match(/^.{2,}@.*\..*$/)) {
      this.errorMessage = 'Enter a valid email address.';
      return;
    }

    if (this.password.length < 6 || this.password.length > 20) {
      this.errorMessage = 'Password must be between 6 and 20 characters.';
      return;
    }

    if (!this.userType) {
      this.errorMessage = 'Please select a user type.';
      return;
    }

    // Additional validation based on user type
    if (this.userType === 'Doctor' && !this.specialization) {
      this.errorMessage = 'Specialization is required for Doctors.';
      return;
    }

    if (this.userType === 'Patient' && (this.age === null || this.age < 1)) {
      this.errorMessage = 'Valid age is required for Patients.';
      return;
    }

    // Prepare user data based on type
    const userData: any = {
      name: this.name,
      email: this.email,
      password: this.password,
      userType: this.userType
    };

    if (this.userType === 'Doctor') {
      userData.specialization = this.specialization;
    } else if (this.userType === 'Patient') {
      userData.age = this.age;
    }

    this.authService.register(userData).subscribe({
      next: (res) => {
        alert('Registration successful');
        
        // Reset form fields
        this.name = '';
        this.email = '';
        this.password = '';
        this.userType = '';
        this.specialization = '';
        this.age = null;
        this.errorMessage = '';

        // Redirect to login page
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}