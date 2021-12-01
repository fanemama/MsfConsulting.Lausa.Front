import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StudentState } from 'src/app/core/store/student/state';
import { StudentModel } from '../../student/model/student.model';
import { CreateEnrollmentModel } from '../model/create-enrollment.model';
import { EnrollmentService } from '../service/enrollment.service';

@Component({
  selector: 'app-enrollment-create',
  templateUrl: './enrollment-create.component.html',
  styleUrls: ['./enrollment-create.component.css']
})
export class EnrollmentCreateComponent implements OnInit {

  @Select(StudentState) student$!: Observable<StudentModel>;
  student!: StudentModel;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService,
    private snackBar: MatSnackBar,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      grade: '',
      course: '',
    });
  }

  ngOnInit() {
    this.student$.subscribe(student => {
      this.student =student;
    })
  }

  save() {
    const enrollment = this.formGroup.value as CreateEnrollmentModel;

      this.enrollmentService.create(this.student.id,enrollment).subscribe(() => {
        this.snackBar.open('Save Sucessed', undefined, {
          duration: 1000,
          panelClass: ['green-snackbar'],
        });
      });
    }
}
