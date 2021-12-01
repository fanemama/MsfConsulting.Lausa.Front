import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MapComponent } from './map.component';
import { MapService } from './service/map.service';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MapRoutingModule
  ],
  declarations: [
    MapComponent
  ],
  providers: [
    MapService,
  ]
})
export class MapModule { }
