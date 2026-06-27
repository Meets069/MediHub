import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  rating: number = 5;
  comment: string = '';
  feedbackList: any[] = [];

  constructor(private feedbackService: FeedbackService,private router:Router) {}


  
  logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  ngOnInit(): void {
    this.loadFeedbacks();
  }

  submitFeedback() {
    if (!this.rating ) {
      alert('Please fill in all required fields.');
      return;
    }

    const feedback = {rating: this.rating, comment: this.comment };

    this.feedbackService.addFeedback(feedback).subscribe(() => {
      alert('Feedback submitted successfully');
      this.loadFeedbacks();
      
      this.rating = 5;
      this.comment = '';
    });
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbackList = data;
    });
  }
}
