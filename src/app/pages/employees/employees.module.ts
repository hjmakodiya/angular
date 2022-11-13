import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { SharedModule } from 'src/app/shared/module/shared.module';

const routes: Routes = [
  {path: "", component: EmployeesComponent}
];

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[EmployeesComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class EmployeesModule { }
