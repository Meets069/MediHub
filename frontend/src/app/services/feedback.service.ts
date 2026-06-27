import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Feedback {
  rating: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:5000/api/feedback';

  constructor(private http: HttpClient) {}

  addFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, feedback);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }
}
