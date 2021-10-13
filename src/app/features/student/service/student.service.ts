import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterStudentModel } from '../model/filter-student.model';
import { LigthStudentModel } from '../model/ligth-student.model';
import { StudentModel } from '../model/student.model';

@Injectable()
export class StudentService {
getById(id: string|null): Observable<StudentModel> {
  const url = `${environment.readApiUrl}/${id}`;
  return this.httpClient.get<StudentModel>(url);
}

constructor(private httpClient: HttpClient) { }

search(filter: FilterStudentModel): Observable<LigthStudentModel[]> {
  const url = `${environment.readApiUrl}/search`;
  const params = filter as {}
  return this.httpClient.get<LigthStudentModel[]>(url,  { params: params });
}

}
