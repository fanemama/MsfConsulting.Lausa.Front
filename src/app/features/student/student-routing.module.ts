import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentResolver } from './resolver/student.resolver';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: StudentListComponent },
  {
    path: ':id',
    component: StudentEditComponent,
  resolve: {
    student: StudentResolver
  } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
