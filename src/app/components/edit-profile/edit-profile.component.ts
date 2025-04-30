import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userEmail: string = '';  // ✅ Declare userEmail
  profile: any = {};  // ✅ Declare profile object
  userType: string = '';  // ✅ Declare userType

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || '';  // Get email from localStorage
    console.log("Stored email:", this.userEmail);  // Debugging log
  
    if (!this.userEmail) {
      console.error("❌ No user email found in localStorage!");
      return;
    }
  
    this.http.get<any>(`http://localhost:5000/api/user/profile/${this.userEmail}`)
      .subscribe(
        (response) => {
          console.log("✅ Profile fetched:", response);
          this.profile = response;
        },
        (error) => {
          console.error("❌ Error fetching profile:", error);
        }
      );
  }
  
  updateProfile() {
    console.log("🚀 updateProfile() function triggered!");
  
    this.http.put(`http://localhost:5000/api/user/profile/${this.userEmail}`, this.profile)
      .subscribe(
        (response) => {
          console.log("✅ Profile updated successfully:", response);
          alert("Profile updated!");
        },
        (error) => {
          console.error("❌ Error updating profile:", error);
          alert("Failed to update profile!");
        }
      );
  }
  
  
  
}
