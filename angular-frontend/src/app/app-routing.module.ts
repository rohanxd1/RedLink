import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorsComponent } from './donors/donors.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { DonorsEditFormComponent } from './donors-edit-form/donors-edit-form.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'adminhome', component: AdminHomeComponent },
  {path:'donor',component:DonorsComponent},
  // { path: 'inventory', component: InventoryComponent },
  // { path: 'hospitals', component: HospitalsComponent },
  // { path: 'logs', component: LogsComponent }
  {path:'donors-edit-mode',component:DonorsEditFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
