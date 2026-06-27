import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-cust-feedback',
  templateUrl: './cust-feedback.component.html',
  styleUrls: ['./cust-feedback.component.css']
})
export class CustFeedbackComponent implements OnInit {
  feedbackList: any[] = [];
  constructor(private feedbackService: FeedbackService,private router: Router) {}
    
  
          logout() {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }

          ngOnInit(): void {
            this.loadFeedbacks();
          }
          loadFeedbacks() {
            this.feedbackService.getFeedbacks().subscribe({
              next: (data) => {
                this.feedbackList = data;
              },
              error: (error) => {
                console.error('Failed to load feedback:', error);
              }
            });
          }
        }