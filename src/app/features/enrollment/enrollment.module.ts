import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentEditComponent } from './enrollment-edit/enrollment-edit.component';
import { EnrollmentCreateComponent } from './enrollment-create/enrollment-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnrollmentService } from './service/enrollment.service';
import { EnrollmentRoutingModule } from './enrollment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EnrollmentRoutingModule
  ],
  declarations: [
    EnrollmentCreateComponent,
    EnrollmentEditComponent],
    providers:[EnrollmentService]
})
export class EnrollmentModule { }
