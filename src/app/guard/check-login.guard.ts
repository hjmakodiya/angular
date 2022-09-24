import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service'

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate, CanLoad {

  private isLogin : any
  constructor(private router: Router, private authService : UserAuthService) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //this.isLogin = this.authService.getIsAuth()
      this.isLogin = true
      if (!this.isLogin)
        return this.router.parseUrl("/login")
      return this.isLogin
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.isLogin = this.authService.getIsAuth()
    if (this.isLogin)
      return this.router.parseUrl("/")
    return true
  }
}
