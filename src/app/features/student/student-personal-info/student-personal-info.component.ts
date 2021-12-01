import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/store/student/action';
import { StudentState } from 'src/app/core/store/student/state';
import { StudentPersonalInfoModel } from '../model/student-personal-info.model';
import { StudentModel } from '../model/student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-personal-info',
  templateUrl: './student-personal-info.component.html',
  styleUrls: ['./student-personal-info.component.css']
})
export class StudentPersonalInfoComponent implements OnInit {

  formGroup: FormGroup;
  @Select(StudentState) student$!: Observable<StudentModel>;
  student!: StudentModel;

  constructor( private formBuilder: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private store: Store,
    private activatedRoute: ActivatedRoute,

  ) {
    this.formGroup = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  }

  ngOnInit() {
    this.student$.subscribe(student => {
      this.student =student;
      this.formGroup.patchValue(this.student);
    });
  }

  save(){
    const studentPersonalInfoModel = this.formGroup.value as StudentPersonalInfoModel;
    this.studentService.updatePersonalInfo(this.student.id, studentPersonalInfoModel)
                      .subscribe(() =>  {
                        this.store.dispatch(new Student.UpdatePersonalInfo(studentPersonalInfoModel))
                        this.snackBar.open('Save Sucessed',undefined,  {duration: 1000, panelClass: ['green-snackbar']})
                      });
  }

}
