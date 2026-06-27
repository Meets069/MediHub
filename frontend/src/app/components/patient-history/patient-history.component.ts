import { Component, OnInit } from '@angular/core';
import { PatientHistoryService } from 'src/app/services/patient-history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  histories: any[] = [];
  newHistory = { patientName: '', disease: '', lastVisit: '', medicine: '' };
  editMode = false;
  selectedHistory: any = null;

  constructor(private historyService: PatientHistoryService,private router:Router) {}


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories(): void {
    this.historyService.getAllHistories().subscribe(data => {
      this.histories = data;
    });
  }

  addHistory(): void {
    this.historyService.addHistory(this.newHistory).subscribe(() => {
      this.loadHistories();
      this.newHistory = { patientName: '', disease: '', lastVisit: '', medicine: '' };
    });
  }

  editHistory(history: any): void {
    this.selectedHistory = { ...history };
    this.editMode = true;
  }

  updateHistory(): void {
    if (!this.selectedHistory) return;
    this.historyService.updateHistory(this.selectedHistory._id, this.selectedHistory).subscribe(() => {
      this.loadHistories();
      this.editMode = false;
      this.selectedHistory = null;
    });
  }

  deleteHistory(id: string): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.historyService.deleteHistory(id).subscribe(() => {
        this.loadHistories();
      });
    }
  }
}

