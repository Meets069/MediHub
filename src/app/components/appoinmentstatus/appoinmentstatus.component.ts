import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


interface Appointment {
  _id?: string;
  doctorName: string;
  specialization: string;
  name: string; // Patient name
  status: string; // Appointment status
  date?: string;
  time?: string;
}

@Component({
  selector: 'app-appoinmentstatus',
  templateUrl: './appoinmentstatus.component.html',
  styleUrls: ['./appoinmentstatus.component.css']
})
export class AppoinmentstatusComponent implements OnInit {
  appointments: Appointment[] = [];
  appointmentForm!: FormGroup;
  currentAppointmentId: string | undefined;

  //  Track disabled buttons per appointment
  disabledButtons: Set<string> = new Set();


  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  constructor(
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
    this.initForm();
  }

  // fetchAppointments(): void {
  //   this.appointmentService.getAppointments().subscribe((data: any[]) => {
  //     this.appointments = data.map(appointment => ({
  //       _id: appointment._id,
  //       doctorName: appointment.doctorName,
  //       specialization: appointment.specialization,
  //       name: appointment.name,
  //       status: appointment.status || 'Pending', // Ensure 'status' is always present
  //       date: appointment.date,
  //       time: appointment.time
  //     }));
  //   });
  // }
  
  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe((data: any[]) => {
      this.appointments = data.map(appointment => ({
        _id: appointment._id,
        doctorName: appointment.doctorName,
        specialization: appointment.specialization,
        name: appointment.name,
        status: appointment.status || 'Pending', // Default to Pending if missing
        date: appointment.date,
        time: appointment.time
      }));
    });
  }
  
  

  initForm(): void {
    this.appointmentForm = this.fb.group({
      doctorName: ['', Validators.required],
      specialization: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  openEditDialog(appointment: Appointment): void {
    this.currentAppointmentId = appointment._id;
    this.appointmentForm.patchValue(appointment);

    const dialogRef = this.dialog.open(this.editDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.saveChanges();
      }
    });
  }

  saveChanges(): void {
    if (this.currentAppointmentId) {
      const updatedAppointment = this.appointmentForm.value;
      this.appointmentService.updateAppointment(this.currentAppointmentId, updatedAppointment).subscribe(() => {
        this.fetchAppointments();
      });
    }
  }

  // Unified method for approve/reject and disabling both buttons
  onDecision(id: string | undefined, status: 'Approved' | 'Rejected'): void {
    if (!id) return;

    this.disabledButtons.add(id); // Disable both buttons immediately

    this.appointmentService.updateAppointment(id, { status }).subscribe(
      () => {
        const appointment = this.appointments.find(a => a._id === id);
        if (appointment) {
          appointment.status = status; // Update UI status
        }
        // Optionally: this.fetchAppointments(); // if you prefer to refresh everything
      },
      error => {
        console.error(`${status} failed:`, error);
        this.disabledButtons.delete(id); // Re-enable buttons if error occurs
      }
    );
  }

  deleteAppointment(id: string | undefined): void {
    if (id) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.fetchAppointments();
      });
    }
  }

  approveAppointment(id: string | undefined): void {
    if (id) {
      console.log('Approving appointment with ID:', id);
      this.appointmentService.updateAppointment(id, { status: 'Approved' })
        .subscribe(
          (response) => {
            console.log('Appointment approved:', response);
            this.fetchAppointments(); // Refresh UI
            
          },
          (error) => console.error('Approval failed:', error)
        );
    }
  }
  
  rejectAppointment(id: string | undefined): void {
    if (id) {
      console.log('Rejecting appointment with ID:', id);
      this.appointmentService.updateAppointment(id, { status: 'Rejected' })
        .subscribe(
          (response) => {
            console.log('Appointment rejected:', response);
            this.fetchAppointments(); // Refresh UI
          },
          (error) => console.error('Rejection failed:', error)
        );
    }
  }
  
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}


