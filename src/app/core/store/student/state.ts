import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { UpdateEnrollmentModel } from 'src/app/features/enrollment/model/update-enrollment.model';
import { StudentModel } from 'src/app/features/student/model/student.model';
import { EnrollmentModel } from 'src/app/shared/model/enrollment.model';
import { Student } from './action';

@State<StudentModel>({
  name: 'student',
  defaults: undefined,
})
@Injectable()
export class StudentState {
  @Action(Student.Set)
  set(ctx: StateContext<StudentModel>, action: Student.Set) {
    ctx.setState(action.student);
  }

  @Action(Student.UpdatePersonalInfo)
  updatePersonalInfo(ctx: StateContext<StudentModel>, action: Student.UpdatePersonalInfo) {
    const state = ctx.getState();
    const studentPersonalInfoModel = action.studentPersonalInfoModel;
    ctx.setState({ ...state,
    firstName: studentPersonalInfoModel.firstName,
    lastName: studentPersonalInfoModel.lastName,
    email: studentPersonalInfoModel.email,
    phone: studentPersonalInfoModel.phone });
  }

  @Action(Student.UpdateEnrollment)
  updateEnrollment(ctx: StateContext<StudentModel>, action: Student.UpdateEnrollment) {
    const state = ctx.getState();
    const updatedEnrollments = state.enrollments.map((item) => item.id == action.updateEnrollment.id ?  this.buildEnrollment(item, action.updateEnrollment) : item );
    ctx.setState({ ...state, enrollments: updatedEnrollments });
  }

  @Action(Student.AddEnrollment)
  addEnrollment(ctx: StateContext<StudentModel>, action: Student.AddEnrollment) {
    const state = ctx.getState();
    ctx.setState({ ...state, enrollments: [...state.enrollments, action.enrollement] });
  }

 private buildEnrollment(enrollment:EnrollmentModel, updateEnrollment: UpdateEnrollmentModel){
   if(enrollment.id != updateEnrollment.id){
     throw new Error("can't build the new enrollemt because (enrollment.id != updateEnrollment.id)");
   }

   return {...enrollment, grade: updateEnrollment.grade, course: updateEnrollment.course};
 }

}
