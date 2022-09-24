import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/global/constants';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  iconPath : string
  loginForm: FormGroup
  response: {}

  constructor(
    private constants : Constants,
    private fb: FormBuilder,
    private userAutServices: UserAuthService,
    private router: Router
  ) { 
    this.iconPath = this.constants.STATIC_ICON_PATH
    console.log("this.iconPath==========>", this.iconPath);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remmber_me: [false]
    })
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    const formValue = this.loginForm.value
    console.log("Login form===>", formValue);
    this.userAutServices.loginCustomer(formValue)
  }
}
