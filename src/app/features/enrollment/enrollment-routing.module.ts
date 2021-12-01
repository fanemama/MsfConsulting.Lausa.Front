import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollmentCreateComponent } from './enrollment-create/enrollment-create.component';
import { EnrollmentEditComponent } from './enrollment-edit/enrollment-edit.component';


const routes: Routes = [
  { path: 'create', component: EnrollmentCreateComponent },
  { path: ':enrollmentid', component: EnrollmentEditComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
