import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

import { Router } from '@angular/router';

interface Appointment {
  _id?: string;
  doctorName: string;
  specialization: string;
  name: string;
  email: string;
  status: string; // Appointment status
  date?: string;
  time?: string;
  description?: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  doctorList = [
    { name: 'Dr. Rajesh Sharma', specialization: 'Cardiology' },
    { name: 'Dr. Priya Mehta', specialization: 'Neurology' },
    { name: 'Dr. Arvind Kapoor', specialization: 'Orthopedics' },
    { name: 'Dr. Neha Verma', specialization: 'Gynecology' },
    { name: 'Dr. Sunil Bansal', specialization: 'Pediatrics' }
  ];

  appointments: Appointment[] = [];
  newAppointment: Appointment = { doctorName: '', specialization: '', name: '', email: '',status:'', description: '' };
  isEditing: boolean = false;
  editId: string | null = null;
  showSlotSelection: boolean = false;
  selectedDate: string = '';
  selectedTime: string = '';
  availableSlots: string[] = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }
  

 
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  selectDoctorFromEvent(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement && selectElement.selectedIndex > 0) {
      const doctor = this.doctorList[selectElement.selectedIndex - 1];
      this.newAppointment.doctorName = doctor.name;
      this.newAppointment.specialization = doctor.specialization;
    }
  }

  // fetchAppointments(): void {
  //   this.appointmentService.getAppointments().subscribe((data: any[]) => {
  //     this.appointments = data;
  //   });
  // }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data: any[]) => {
      this.appointments = data.map(appointment => ({
        _id: appointment._id,
        doctorName: appointment.doctorName,
        specialization: appointment.specialization,
        name: appointment.name,
        email: appointment.email,  // ✅ Add missing email property
        status: appointment.status === 1 ? 'Approved' : appointment.status === 0 ? 'Rejected' : 'Pending',
        date: appointment.date,
        time: appointment.time
      }));
    });
  }
  

  openSlotSelection(): void {
    this.showSlotSelection = true;
  }

  closeSlotSelection(): void {
    this.showSlotSelection = false;
  }

  selectTimeSlot(slot: string): void {
    this.selectedTime = slot;
  }

  confirmAppointment(): void {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select a date and time slot.');
      return;
    }

    this.newAppointment.date = this.selectedDate;
    this.newAppointment.time = this.selectedTime;

    if (this.isEditing) {
      this.updateAppointment();
    } else {
      this.addAppointment();
    }

    this.closeSlotSelection();
  }

  addAppointment(): void {
    this.appointmentService.createAppointment(this.newAppointment).subscribe(() => {
      this.fetchAppointments();
      this.resetForm();
      alert('Appointment confirmed successfully!');
      this.router.navigate(['/doctor']);
    }, (error) => {
      alert('Failed to confirm appointment. Please try again.');
    });
  }

  updateAppointment(): void {
    if (this.editId) {
      const { status, ...updatedAppointment } = this.newAppointment; // Exclude status
      this.appointmentService.updateAppointment(this.editId, updatedAppointment).subscribe(() => {
        this.fetchAppointments();
        this.resetForm();
      });
    }
  }
  

  deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.fetchAppointments();
    });
  }

  resetForm(): void {
    this.newAppointment = { doctorName: '', specialization: '', name: '', email: '', status: 'Pending', description: '' };
    this.selectedDate = '';
    this.selectedTime = '';
    this.isEditing = false;
    this.editId = null;
  }
}


