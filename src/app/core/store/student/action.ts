import { StudentModel } from "src/app/features/student/model/student.model";
import { EnrollementModel } from "src/app/shared/model/enrollement.model";

export namespace Student {
  export class Set {
    static readonly type = '[Student] Set';
    constructor(public student: StudentModel) {}
  }

  export class UpdateEnrollment {
    static readonly type = '[Student] UpdateEnrollment';
    constructor(public enrollement: EnrollementModel) {}
  }

  export class AddEnrollment {
    static readonly type = '[Student] UpdateEnrollment';
    constructor(public enrollement: EnrollementModel) {}
  }
}
