import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './donors/donors.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { BloodComponent } from './blood/blood.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthenticationGuard } from './guards/authentication.guard';


const routes: Routes = [

  { path: '', component: HomeComponent },
  {path: 'adminlogin', component:AdminloginComponent},
  { path: 'adminhome', component: AdminHomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'donor', component: DonorsComponent, canActivate: [AuthenticationGuard] },
  { path: 'hospital', component: HospitalComponent, canActivate: [AuthenticationGuard] },
  { path: 'inventory', component: BloodComponent, canActivate: [AuthenticationGuard] },
  // { path: 'logs', component: LogsComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
