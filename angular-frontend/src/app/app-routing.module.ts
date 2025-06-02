import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './donors/donors.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { BloodComponent } from './blood/blood.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HospitalUserHomeComponent } from './hospital-user/hospital-user-home/hospital-user-home.component';
import { HospitalUserLoginComponent } from './hospital-user/hospital-user-login/hospital-user-login.component';
import { HospitalAuthGuard } from './guards/hospital-auth.guard';
import { AdminLogsComponent } from './admin-logs/admin-logs.component';
import { HospitalLogsComponent } from './hospital-user/hospital-logs/hospital-logs.component';
import { RequestBloodComponent } from './hospital-user/request-blood/request-blood.component';
import { UrgentlogsComponent } from './urgentlogs/urgentlogs.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  {path: 'adminlogin', component:AdminloginComponent},
  { path: 'adminhome', component: AdminHomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'donor', component: DonorsComponent, canActivate: [AuthenticationGuard] },
  { path: 'hospital', component: HospitalComponent, canActivate: [AuthenticationGuard] },
  { path: 'inventory', component: BloodComponent, canActivate: [AuthenticationGuard] },
  { path: 'logs', component: AdminLogsComponent,canActivate: [AuthenticationGuard] },
  { path: 'urgentlogs', component:UrgentlogsComponent,canActivate: [AuthenticationGuard] },
  // hospital users
  { path: 'hospitaluserlogin', component: HospitalUserLoginComponent },
  { path: 'hospitaluserhome', component: HospitalUserHomeComponent, canActivate: [HospitalAuthGuard] },
  { path: 'requestblood', component: RequestBloodComponent, canActivate: [HospitalAuthGuard] },
  {path:'hospitallogs',component:HospitalLogsComponent, canActivate:[HospitalAuthGuard]}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
