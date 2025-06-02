import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DonorsComponent } from './donors/donors.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { HospitalComponent } from './hospital/hospital.component';
import { BloodComponent } from './blood/blood.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { HospitalUserHomeComponent } from './hospital-user/hospital-user-home/hospital-user-home.component';
import { HospitalUserLoginComponent } from './hospital-user/hospital-user-login/hospital-user-login.component';
import { AdminLogsComponent } from './admin-logs/admin-logs.component';
import { HospitalLogsComponent } from './hospital-user/hospital-logs/hospital-logs.component';
import { RequestBloodComponent } from './hospital-user/request-blood/request-blood.component';
import { UrgentlogsComponent } from './urgentlogs/urgentlogs.component';


@NgModule({
  declarations: [
    AppComponent,
    DonorsComponent,
    AdminHomeComponent,
    HomeComponent,
    HospitalComponent,
    BloodComponent,
    AdminloginComponent,
    HospitalUserHomeComponent,
    HospitalUserLoginComponent,
    AdminLogsComponent,
    HospitalLogsComponent,
    RequestBloodComponent,
    UrgentlogsComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
