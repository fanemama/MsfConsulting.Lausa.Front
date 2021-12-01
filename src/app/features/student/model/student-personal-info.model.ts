import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { EnrollmentModel } from 'src/app/shared/model/enrollment.model';
import { UnenrollmentModel } from './unenrollment.model';

export interface StudentPersonalInfoModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
