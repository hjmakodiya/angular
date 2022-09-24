import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Constants } from './global/constants';
import { FooterModule } from './shared/components/footer/footer.module';
import { HeaderModule } from './shared/components/header/header.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { AlertModule } from './shared/components/alert/alert.module';
import { CustomFormComponent } from './shared/components/custom-form/custom-form.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    NavbarModule,
    FooterModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [
    Constants
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }