// import { Component, OnInit } from '@angular/core';
// import { DoctorService } from 'src/app/doctor.service';
// import { Doctor } from '../../models/doctor.model';

// @Component({
//   selector: 'app-doctor',
//   templateUrl: './doctor.component.html',
//   styleUrls: ['./doctor.component.css']
// })
// export class DoctorComponent implements OnInit {
//   doctors: Doctor[] = [];
//   showForm: boolean = false;
//   editMode: boolean = false;
//   doctorForm: Doctor = { id: '', name: '', specialization: '', experience: 0, contact: '' };

//   // Static list of doctors
//   predefinedDoctors: Doctor[] = [
//     { id: '1', name: 'Dr. Rajesh Sharma', specialization: 'Cardiology', experience: 15, contact: '1234567890' },
//     { id: '2', name: 'Dr. Priya Mehta', specialization: 'Neurology', experience: 12, contact: '0987654321' },
//     { id: '3', name: 'Dr. Arvind Kapoor', specialization: 'Orthopedics', experience: 10, contact: '1122334455' },
//     { id: '4', name: 'Dr. Neha Verma', specialization: 'Gynecology', experience: 8, contact: '5566778899' }
//   ];

//   constructor(private doctorService: DoctorService) {}

//   ngOnInit(): void {
//     this.loadDoctors();
//   }

//   // Load doctors from API and merge with predefined list
//   loadDoctors(): void {
//     this.doctors = [...this.predefinedDoctors];
//     this.doctorService.getDoctors().subscribe((data) => {
//       this.doctors = [...this.doctors, ...data];
//     });
//   }

//   // Show/Hide the form
//   toggleForm(): void {
//     this.showForm = !this.showForm;
//     this.editMode = false;
//     this.resetForm();
//   }

//   // Add or Update Doctor
//   saveDoctor(): void {
//     if (this.editMode && this.doctorForm.id) {
//       this.doctorService.updateDoctor(this.doctorForm.id, this.doctorForm).subscribe((updatedDoctor) => {
//         const index = this.doctors.findIndex((doc) => doc.id === updatedDoctor.id);
//         if (index !== -1) {
//           this.doctors[index] = updatedDoctor;
//         }
//         this.toggleForm();
//       });
//     } else {
//       this.doctorService.addDoctor(this.doctorForm).subscribe((newDoctor) => {
//         this.doctors.push(newDoctor);
//         this.toggleForm();
//       });
//     }
//   }

//   // Edit Doctor
//   editDoctor(doctor: Doctor): void {
//     this.doctorForm = { ...doctor };
//     this.editMode = true;
//     this.showForm = true;
//   }

//   // Cancel Editing
//   cancelEdit(): void {
//     this.toggleForm();
//   }

//   // Delete Doctor
//   deleteDoctor(id: string): void {
//     this.doctorService.deleteDoctor(id).subscribe(() => {
//       this.doctors = this.doctors.filter((doc) => doc.id !== id);
//     });
//   }

//   // Reset form
//   private resetForm(): void {
//     this.doctorForm = { id: '', name: '', specialization: '', experience: 0, contact: '' };
//   }
// }
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-doctors',
//   templateUrl: './doctor.component.html',
//   styleUrls: ['./doctor.component.css']
// })
// export class DoctorComponent {
//   title: string = 'Meet Our Expert Doctors';
//   description: string = 'Our team of highly qualified doctors is here to provide the best medical care.';

//   doctorList = [
//     { name: 'Dr. Rajesh Sharma', specialization: 'Cardiology (Heart Specialist)' },
//     { name: 'Dr. Priya Mehta', specialization: 'Neurology (Brain & Nervous System)' },
//     { name: 'Dr. Arvind Kapoor', specialization: 'Orthopedics (Bones & Joints)' },
//     { name: 'Dr. Neha Verma', specialization: 'Gynecology (Women\'s Health)' },
//     { name: 'Dr. Sunil Bansal', specialization: 'Pediatrics (Child Specialist)' },
//     { name: 'Dr. Ritu Malhotra', specialization: 'Dermatology (Skin Specialist)' },
//     { name: 'Dr. Anil Khanna', specialization: 'Oncology (Cancer Specialist)' },
//     { name: 'Dr. Sameer Patel', specialization: 'Ophthalmology (Eye Specialist)' },
//     { name: 'Dr. Kavita Joshi', specialization: 'Endocrinology (Diabetes & Hormones)' },
//     { name: 'Dr. Sanjay Rathore', specialization: 'Gastroenterology (Digestive System)' },
//     { name: 'Dr. Meena Desai', specialization: 'Nephrology (Kidney Specialist)' },
//     { name: 'Dr. Mohit Saxena', specialization: 'Urology (Urinary Tract & Male Health)' },
//     { name: 'Dr. Alok Gupta', specialization: 'Pulmonology (Lungs & Respiratory System)' },
//     { name: 'Dr. Sneha Agarwal', specialization: 'Psychiatry (Mental Health)' },
//     { name: 'Dr. Vikram Nanda', specialization: 'General Surgery' },
//     { name: 'Dr. Pooja Sinha', specialization: 'ENT (Ear, Nose, and Throat)' },
//     { name: 'Dr. Manish Choudhary', specialization: 'Rheumatology (Arthritis & Joints)' },
//     { name: 'Dr. Swati Kapoor', specialization: 'Dental Surgery' },
//     { name: 'Dr. Ramesh Iyer', specialization: 'Anesthesiology' },
//     { name: 'Dr. Aarti Saxena', specialization: 'Radiology (Medical Imaging)' }
//   ];
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  selectedDoctorIndex: number | null = null;

  // Updated doctor list with full details
  doctorList = [
    { name: 'Dr. Rajesh Sharma', specialization: 'Cardiology', experience: 15, visitingDays: 'Mon - Fri', timings: '10 AM - 4 PM', contact: '9876543210' },
    { name: 'Dr. Priya Mehta', specialization: 'Neurology', experience: 12, visitingDays: 'Tue - Sat', timings: '9 AM - 2 PM', contact: '9988776655' },
    { name: 'Dr. Arvind Kapoor', specialization: 'Orthopedics', experience: 10, visitingDays: 'Mon - Thu', timings: '11 AM - 5 PM', contact: '8866442200' },
    { name: 'Dr. Neha Verma', specialization: 'Gynecology', experience: 8, visitingDays: 'Wed - Sun', timings: '8 AM - 1 PM', contact: '7766554433' },
    { name: 'Dr. Sunil Bansal', specialization: 'Pediatrics', experience: 14, visitingDays: 'Mon - Sat', timings: '10 AM - 3 PM', contact: '6655443322' }
  ];

  constructor(private router: Router) {}


    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

  toggleDetails(index: number) {
    this.selectedDoctorIndex = this.selectedDoctorIndex === index ? null : index;
  }

  bookAppointment(doctor: any) {
    this.router.navigate(['/appointment'], { state: { doctor } });
  }
}
