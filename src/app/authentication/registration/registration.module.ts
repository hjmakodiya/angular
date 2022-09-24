import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/module/shared.module';

const routes: Routes = [
  {path: "", component: RegistrationComponent}
];

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[RegistrationComponent]
})
export class RegistrationModule { }
