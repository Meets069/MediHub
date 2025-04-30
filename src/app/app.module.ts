import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <- Add this
// import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Required for [(ngModel)]
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AppoinmentstatusComponent } from './components/appoinmentstatus/appoinmentstatus.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppoinmentapprovalComponent } from './components/appoinmentapproval/appoinmentapproval.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { CustFeedbackComponent } from './components/cust-feedback/cust-feedback.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatTableModule } from '@angular/material/table';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // ✅ Ensure LoginComponent is Declared
    RegisterComponent, 
    HomeComponent, 
    DoctorComponent, AppointmentComponent,AboutusComponent, AppoinmentstatusComponent, AppoinmentapprovalComponent, DoctorDashboardComponent, CustFeedbackComponent,FeedbackComponent, ScheduleComponent, PatientHistoryComponent, ForgotPasswordComponent,EditProfileComponent, // ✅ Ensure RegisterComponent is Declared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // ✅ Import Routing Module
    FormsModule ,
    HttpClientModule,// ✅ Required for [(ngModel)]
    MatFormFieldModule,   // Material UI form field
    MatInputModule,       // Material input fields
    MatDialogModule,      // For popup dialogs
    MatButtonModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule    // Material buttons
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
