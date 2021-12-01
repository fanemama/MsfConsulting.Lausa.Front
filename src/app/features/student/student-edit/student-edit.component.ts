import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StudentState } from 'src/app/core/store/student/state';
import { StudentModel } from '../model/student.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  @Select(StudentState) student$!: Observable<StudentModel>;
  constructor() { }

  ngOnInit() {
  }
}
