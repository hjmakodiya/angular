import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer.component';

const routes: Routes = [
  {path : "", component:FooterComponent}
];

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
