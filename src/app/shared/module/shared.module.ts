import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from '../components/alert/alert.module';
import { CustomFormComponent } from '../components/custom-form/custom-form.component';
import { TitleComponent } from '../components/title/title.component';
import { GridComponent } from '../components/grid/grid.component';


@NgModule({
  declarations: [
    TitleComponent,
    CustomFormComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule
  ],
  exports:[
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    TitleComponent,
    CustomFormComponent,
    GridComponent
  ]
})
export class SharedModule { }
