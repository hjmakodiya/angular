import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  iconPath = ""
  username : string 
  role : string

  constructor(
    private authService : UserAuthService
  ) { 
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('custUsername') || ''
    this.role = localStorage.getItem('custRole') || ''
  }

  logout() {
    this.authService.logout()
  }
}
