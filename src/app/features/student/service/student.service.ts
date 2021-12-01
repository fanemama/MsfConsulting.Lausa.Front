import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterStudentModel } from '../model/filter-student.model';
import { LigthStudentModel } from '../model/ligth-student.model';
import { StudentPersonalInfoModel } from '../model/student-personal-info.model';
import { StudentModel } from '../model/student.model';

@Injectable()
export class StudentService {

getById(id: string|null): Observable<StudentModel> {
  const url = `${environment.readApiUrl}/Student/${id}`;
  return this.httpClient.get<StudentModel>(url);
}

constructor(private httpClient: HttpClient) { }

search(filter: FilterStudentModel): Observable<LigthStudentModel[]> {
  const url = `${environment.readApiUrl}/Student/search`;
  const params = filter as {}
  return this.httpClient.get<LigthStudentModel[]>(url,  { params: params });
}

updatePersonalInfo(id: number, studentPersonalInfoModel: StudentPersonalInfoModel) {
  const url = `${environment.writeApiUrl}/Student/edit-personal-info/${id}`;
  return this.httpClient.put(url,  studentPersonalInfoModel);
}

}
