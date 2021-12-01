import { UpdateEnrollmentModel } from "src/app/features/enrollment/model/update-enrollment.model";
import { StudentPersonalInfoModel } from "src/app/features/student/model/student-personal-info.model";
import { StudentModel } from "src/app/features/student/model/student.model";
import { EnrollmentModel } from "src/app/shared/model/enrollment.model";

export namespace Student {
  export class Set {
    static readonly type = '[Student] Set';
    constructor(public student: StudentModel) {}
  }

  export class UpdatePersonalInfo {
    static readonly type = '[Student] UpdatePersonalInfo';
    constructor(public studentPersonalInfoModel: StudentPersonalInfoModel) {}
  }

  export class UpdateEnrollment {
    static readonly type = '[Student] UpdateEnrollment';
    constructor(public updateEnrollment: UpdateEnrollmentModel) {}
  }

  export class AddEnrollment {
    static readonly type = '[Student] UpdateEnrollment';
    constructor(public enrollement: EnrollmentModel) {}
  }
}
