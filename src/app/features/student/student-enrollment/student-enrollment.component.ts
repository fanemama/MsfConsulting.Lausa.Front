import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StudentState } from 'src/app/core/store/student/state';
import { EnrollmentModel } from 'src/app/shared/model/enrollment.model';
import { StudentModel } from '../model/student.model';

@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css'],
})
export class StudentEnrollmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'grade', 'course', 'date'];
  dataSource!: EnrollmentModel[];
  @Select(StudentState) student$!: Observable<StudentModel>;
  constructor( private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.student$.subscribe((student) => this.dataSource = student.enrollments);
  }

  edit(enrollement: EnrollmentModel) {
    this.router.navigate(['enrollment',enrollement.id], {relativeTo: this.activatedRoute});
  }
}
