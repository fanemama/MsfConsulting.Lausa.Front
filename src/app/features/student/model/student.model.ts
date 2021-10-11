import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { EnrollementModel } from 'src/app/shared/model/enrollement.model';
import { UnenrollmentModel } from './unenrollment.model';

export interface StudentModel {
  id: number;
  FirstName: number;
  lastName: String;
  email: string;
  phone: string;
  enrollments: EnrollementModel[];
  unenrollments: UnenrollmentModel[];
}
