import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Appointment {
  _id?: string;
  doctorName: string;
  specialization: string;
  date?: string;
  time?: string;
  status?:string
}



@Component({
  selector: 'app-appoinmentapproval',
  templateUrl: './appoinmentapproval.component.html',
  styleUrls: ['./appoinmentapproval.component.css']
})
export class AppoinmentapprovalComponent implements OnInit {
  appointments: Appointment[] = [];
  appointmentForm!: FormGroup;
  currentAppointmentId: string | undefined;

  @ViewChild('editDialog') editDialog!: TemplateRef<any>; // THIS FIXES THE ERROR

  constructor(
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router:Router
    
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
    this.initForm();
  }


  
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data: any[]) => {
      this.appointments = data.map(appointment => ({
        _id: appointment._id,
        doctorName: appointment.doctorName,
        specialization: appointment.specialization,
        name: appointment.name,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      }));
    });
  }
  

  initForm(): void {
    this.appointmentForm = this.fb.group({
      doctorName: ['', Validators.required],
      specialization: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      // status: ['Pending']  // <-- Default to 'Pending'
    });
  }

  
  

  // openEditDialog(appointment: Appointment): void {
  //   this.currentAppointmentId = appointment._id;

  //   // Ensure 'status' is set to 'Pending' if it's not available
  // if (!appointment.status) {
  //   appointment.status = 'Pending';
  // }
  //   // Set default status to 'Pending' if it is not already defined
  // // Set default status to 'Pending'
  // const appointmentWithPendingStatus = {
  //   ...appointment,
  //   status: 'Pending'
  // };
  
  
  
  
  //   // appointment.status = appointment.status || 'Pending';
  //   this.appointmentForm.patchValue(appointmentWithPendingStatus);

  //   const dialogRef = this.dialog.open(this.editDialog, {
  //     width: '400px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'save') {
  //       this.saveChanges();
  //     }
  //   });
  // }

  // saveChanges(): void {
  //   if (this.currentAppointmentId) {
  //     const updatedAppointment = this.appointmentForm.value;
  //     this.appointmentService.updateAppointment(this.currentAppointmentId, updatedAppointment).subscribe(() => {
  //       this.fetchAppointments();
  //       // status: this.appointmentForm.value.status || 'Pending'

  //     });
  //   }
  // }
  openEditDialog(appointment: Appointment): void {
    this.currentAppointmentId = appointment._id;

    this.appointmentForm.patchValue({
      doctorName: appointment.doctorName,
      specialization: appointment.specialization,
      date: appointment.date,
      time: appointment.time
    });

    this.dialog.open(this.editDialog, {
      width: '400px'
    });
  }

  // saveChanges(): void {
    
  //   const updateData = {
  //       doctorName: this.appointmentForm.value.doctorName,
  //       specialization: this.appointmentForm.value.specialization,
  //       date: this.appointmentForm.value.date,
  //       time: this.appointmentForm.value.time,

  //       status: 'Pending' // Always force status to Pending on update
  //     };

  //     console.log('Update payload:', updateData);

  //     this.appointmentService.updateAppointment(appointment._id, updateData).subscribe({
  //       next: (updated) => {
  //         console.log('Updated successfully', updated);
  //         // your success logic
  //       },
  //       error: (err) => {
  //         console.error('Update failed:', err); // ✅ Catch the actual error
  //       }
  //     });
  //   }

  saveChanges(): void {
    if (this.currentAppointmentId) {
      const updateData = {
        doctorName: this.appointmentForm.value.doctorName,
        specialization: this.appointmentForm.value.specialization,
        date: this.appointmentForm.value.date,
        time: this.appointmentForm.value.time,
        status: 'Pending' // Always force status to 'Pending' on update
      };
  
      console.log('Update payload:', updateData); // Log the payload being sent
  
      // Make sure currentAppointmentId is valid
      console.log('Updating appointment with ID:', this.currentAppointmentId);
  
      this.appointmentService.updateAppointment(this.currentAppointmentId, updateData).subscribe({
        next: (updated) => {
          console.log('Updated successfully', updated);
          // your success logic
        },
        error: (err) => {
          console.error('Update failed:', err); // Catch the actual error
        }
      });
    }
  }
  
  
  // saveChanges(): void {
  //   if (this.currentAppointmentId) {
  //     const updatedAppointment = {
  //       ...this.appointmentForm.value,
  //       status: 'Pending'  // Force status to 'Pending'
  //     };
  
  //     this.appointmentService.updateAppointment(this.currentAppointmentId, updatedAppointment).subscribe(() => {
  //       this.fetchAppointments();
  //     });
  //   }
  // }
  

  deleteAppointment(id: string | undefined): void {
    if (id) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.fetchAppointments();
      });
    }
  }
}


