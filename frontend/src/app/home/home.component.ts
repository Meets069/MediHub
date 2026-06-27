// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   showSplash: boolean = true; // Show splash screen initially

//   ngOnInit() {
//     // Hide splash screen after 3 seconds
//     setTimeout(() => {
//       this.showSplash = false;
//     }, 3000);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showSplash: boolean = true; // Show splash screen initially

  constructor(private router: Router) {} // Inject Router

  ngOnInit() {
    // Hide splash screen after 1 seconds
    setTimeout(() => {
      this.showSplash = false;
    }, 1000);
  }

  // ✅ Fix: Add these missing methods
  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to login page
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navigate to register page
  }
}
