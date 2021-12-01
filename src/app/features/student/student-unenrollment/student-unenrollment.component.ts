import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StudentState } from 'src/app/core/store/student/state';
import { StudentModel } from '../model/student.model';
import { UnenrollmentModel } from '../model/unenrollment.model';

@Component({
  selector: 'app-student-unenrollment',
  templateUrl: './student-unenrollment.component.html',
  styleUrls: ['./student-unenrollment.component.css']
})
export class StudentUnenrollmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'course', 'comment', 'date'];
  dataSource!: UnenrollmentModel[];
  @Select(StudentState) student$!: Observable<StudentModel>;
  constructor() { }

  ngOnInit() {
    this.student$.subscribe((student) => this.dataSource = student.unenrollments);
  }

}
