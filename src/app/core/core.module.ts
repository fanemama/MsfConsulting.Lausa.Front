import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { StudentState } from './store/student/state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([StudentState], {
      developmentMode: !environment.production,
    }),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
      );
    }
  }
}
