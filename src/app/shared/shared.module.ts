import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  declarations: []
})
export class SharedModule { }
