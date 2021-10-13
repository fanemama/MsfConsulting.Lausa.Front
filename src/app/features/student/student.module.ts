import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentService } from './service/student.service';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentResolver } from './resolver/student.resolver';
import { StudentPersonalInfoComponent } from './student-personal-info/student-personal-info.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StudentUnenrollmentComponent } from './student-unenrollment/student-unenrollment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule
  ],
  declarations: [
    StudentListComponent,
    StudentEditComponent,
    StudentPersonalInfoComponent,
    StudentEnrollmentComponent,
    StudentUnenrollmentComponent
  ],
  providers: [
    StudentService,
    StudentResolver
  ]
})
export class StudentModule { }
