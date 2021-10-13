import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StudentModel } from '../model/student.model';
import { StudentService } from '../service/student.service';
import { tap} from 'rxjs/operators';
import { Student } from 'src/app/core/store/student/action';


@Injectable()
export class StudentResolver implements Resolve<StudentModel> {

constructor(private studentService: StudentService, private store: Store) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentModel> {
  const id = route.paramMap.get('id');
   return this.studentService.getById(id).pipe(tap(student => {
     if(student){
      this.store.dispatch(new Student.Set(student))
     }
   }))
  }

}
