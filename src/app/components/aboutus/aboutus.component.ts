import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent{

  // constructor() { }
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

    


  doctors = [
    { name: 'Dr. Rajesh Sharma', specialization: 'Cardiologist', image: 'assets/doctor1.jpg' },
    { name: 'Dr. Priya Mehta', specialization: 'Neurologist', image: 'assets/doctor2.jpg' },
    { name: 'Dr. Sunil Bansal', specialization: 'Pediatrician', image: 'assets/doctor3.jpg' }
  ];
}

