import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './donors/donors.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'adminhome', component: AdminHomeComponent },
  {path:'donor',component:DonorsComponent},
  {path:'hospital',component:HospitalComponent}
  // { path: 'inventory', component: InventoryComponent },
  // { path: 'logs', component: LogsComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
