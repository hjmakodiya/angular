import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/global/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  iconPath = Constants.STATIC_ICON_PATH

  constructor() { }

  ngOnInit(): void {
  }

}
