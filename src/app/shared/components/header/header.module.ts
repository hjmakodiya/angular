import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header.component';

const routes: Routes = [
  {path : "", component:HeaderComponent}
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
