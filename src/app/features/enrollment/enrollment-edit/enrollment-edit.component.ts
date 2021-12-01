import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/store/student/action';
import { StudentState } from 'src/app/core/store/student/state';
import { EnrollmentModel } from 'src/app/shared/model/enrollment.model';
import { StudentModel } from '../../student/model/student.model';
import { combineLatest } from 'rxjs';
import { UpdateEnrollmentModel } from '../model/update-enrollment.model';
import { EnrollmentService } from '../service/enrollment.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-enrollment-edit',
  templateUrl: './enrollment-edit.component.html',
  styleUrls: ['./enrollment-edit.component.css'],
})
export class EnrollmentEditComponent implements OnInit {
  formGroup: FormGroup;
  @Select(StudentState) student$!: Observable<StudentModel>;
  enrollement!: EnrollmentModel | undefined;

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
    combineLatest(
      [this.student$,
      this.activatedRoute.params
    ]).subscribe(
      ([student, params]) => {
        const id = +params['enrollmentid'];
        this.enrollement = student.enrollments.find((x) => x.id == id);
        if (this.enrollement) {
          this.formGroup.patchValue(this.enrollement);
        }
      }
    );
  }

  save() {
    const enrollment = this.formGroup.value as UpdateEnrollmentModel;
    if (this.enrollement?.id) {
      enrollment.id = this.enrollement.id ?? 0;
      this.enrollmentService.update(enrollment).subscribe(() => {
        this.store.dispatch(new Student.UpdateEnrollment(enrollment));
        this.snackBar.open('Save Sucessed', undefined, {
          duration: 1000,
          panelClass: ['green-snackbar'],
        });
      });
    }
  }
}
