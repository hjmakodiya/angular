import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { SharedModule } from 'src/app/shared/module/shared.module';

const routes: Routes = [
  {path: "", component: DepartmentsComponent}
];

@NgModule({
  declarations: [
    DepartmentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[DepartmentsComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DepartmentsModule { }
