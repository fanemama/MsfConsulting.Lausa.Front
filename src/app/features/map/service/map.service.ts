import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentLocationModel } from '../model/student-location.model';


@Injectable()
export class MapService {
  constructor(private httpClient: HttpClient) {}

  getAllStudentLocation():Observable<StudentLocationModel[]> {
    const url = `${environment.readApiUrl}/student/get-all-student-location`;
    return this.httpClient.get<StudentLocationModel[]>(url);
  }
}
