import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'travello';
  public isLogin : boolean
  
  constructor(
    private router : Router,
    private authService : UserAuthService) {
  }

  ngOnInit() {
    this.authService.autoAuthCust();
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
        //this.isLogin = this.authService.getIsAuth()
        this.isLogin = true
      }
   })
  }
}