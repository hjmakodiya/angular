import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/global/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  iconPath = ""

  constructor() { }

  ngOnInit(): void {
  }

}
