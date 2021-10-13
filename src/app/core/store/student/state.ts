import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { StudentModel } from 'src/app/features/student/model/student.model';
import { EnrollementModel } from 'src/app/shared/model/enrollement.model';
import { Student } from './action';

@State<StudentModel>({
  name: 'student',
  defaults: undefined,
})
@Injectable()
export class StudentState {
  @Action(Student.Set)
  set(ctx: StateContext<StudentModel>, action: Student.Set) {
    debugger;
    ctx.setState(action.student);
  }

  @Action(Student.UpdateEnrollment)
  updateEnrollment(ctx: StateContext<StudentModel>, action: Student.UpdateEnrollment) {
    const state = ctx.getState();
    const updatedEnrollments = state.enrollments.map((item) => item.id == action.enrollement.id ? action.enrollement : item );
    ctx.setState({ ...state, enrollments: updatedEnrollments });
  }

  @Action(Student.AddEnrollment)
  addEnrollment(ctx: StateContext<StudentModel>, action: Student.AddEnrollment) {
    const state = ctx.getState();
    ctx.setState({ ...state, enrollments: [...state.enrollments, action.enrollement] });
  }
}
