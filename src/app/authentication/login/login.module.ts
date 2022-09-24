import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { AppModule } from 'src/app/app.module';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';

const routes: Routes = [
  {path: "", component: LoginComponent}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
    
  ],
  exports:[LoginComponent]
})

export class LoginModule { }