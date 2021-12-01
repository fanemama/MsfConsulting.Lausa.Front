import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateEnrollmentModel } from '../model/create-enrollment.model';
import { UpdateEnrollmentModel } from '../model/update-enrollment.model';

@Injectable()
export class EnrollmentService {
  constructor(private httpClient: HttpClient) {}

  update(updateEnrollment: UpdateEnrollmentModel) {
    const url = `${environment.writeApiUrl}/enroll/update`;
    return this.httpClient.put(url, updateEnrollment);
  }

  create(studentId: number, createEnrollment: CreateEnrollmentModel) {
    const url = `${environment.writeApiUrl}/${studentId}`;
    return this.httpClient.put(url, createEnrollment);
  }
}
