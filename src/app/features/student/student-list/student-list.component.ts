import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterStudentModel } from '../model/filter-student.model';
import { LigthStudentModel } from '../model/ligth-student.model';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'nbrEnrollment',
    'nbrUnenrollment',
  ];
  dataSource!: LigthStudentModel[];
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  }

  ngOnInit() {
    this.search({} as FilterStudentModel);
  }

  searh() {
    const filter = this.formGroup.value as FilterStudentModel;
    this.search(filter);
  }

  edit(student: LigthStudentModel) {
    this.router.navigate(['../',student.id], {relativeTo: this.activatedRoute});
  }

  private search(filter: FilterStudentModel) {
    this.studentService.search(filter).subscribe((x) => (this.dataSource = x));
  }
}
