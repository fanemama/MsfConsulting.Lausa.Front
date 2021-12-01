import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StudentState } from 'src/app/core/store/student/state';
import { StudentModel } from './model/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Select(StudentState) student$!: Observable<StudentModel>;
  student!: StudentModel;
  constructor() { }

  ngOnInit() {
    this.student$.subscribe(student => {
      this.student =student;
    });
  }

}
