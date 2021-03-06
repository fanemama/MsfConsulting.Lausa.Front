import { EnrollmentModel } from 'src/app/shared/model/enrollment.model';
import { UnenrollmentModel } from './unenrollment.model';

export interface StudentModel {
  id: number;
  firstName: string;
  lastName: String;
  email: string;
  phone: string;
  enrollments: EnrollmentModel[];
  unenrollments: UnenrollmentModel[];
}
