import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AppoinmentstatusComponent } from './components/appoinmentstatus/appoinmentstatus.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { AppoinmentapprovalComponent } from './components/appoinmentapproval/appoinmentapproval.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { CustFeedbackComponent } from './components/cust-feedback/cust-feedback.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default landing page
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'doctor', component: DoctorComponent }, // Doctor Component Route
  { path: 'about', component: AboutusComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'approval', component: AppoinmentstatusComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'status', component: AppoinmentapprovalComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'custfeedback', component: CustFeedbackComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'patient-history', component: PatientHistoryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
   {path : 'edit-profile', component: EditProfileComponent},



  // { path: 'patients', component: PatientsComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'feedback', component: FeedbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
