import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  appointments: any[] = [];
  currentDate: string = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  constructor(private appointmentService: AppointmentService,private router: Router) {}


  
    
      logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(data => {
      this.appointments = data.filter(appointment => appointment.date === this.currentDate);
    }, error => {
      console.error('Error fetching appointments:', error);
    });
  }
}

