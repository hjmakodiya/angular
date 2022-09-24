import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'
import { Constants } from '../global/constants'
import { MessagingService } from './messaging.service'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public isAuthenticated = false
  public token: string
  public custEmail: string
  public custUsername: string
  public custRole: string
  private tokenTimer: any

  constructor(
    private constants : Constants,
    private http : HttpClient,
    private router : Router,
    private msgServices : MessagingService
    ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getCustMail() {
    return this.custEmail;
  }

  getCustName() {
    return this.custUsername;
  }

  getRole() {
    return this.custRole;
  }

  loginCustomer(data: object) {
    const apiUrl = `${this.constants.BASE_API_URL}${this.constants.API_LOGIN_PATH}`
    return this.http.post(apiUrl, data).pipe(catchError(this.errorHandler)).subscribe(
    (response : any) => {

      const token = response.authToken
      this.custEmail = response.email
      this.custUsername = response.username
      this.custRole = response.role
      this.isAuthenticated = true

      const now = new Date()
      const expirationDate = new Date(
        now.getTime() + response.expiresIn * 1000
      )

      this.saveAuthData(expirationDate, token, this.custEmail, this.custUsername, this.custRole)
      this.router.navigate(['/'])
    },
    error => {
      console.log("There is error while login========>", error)
      this.msgServices.error(error, true)
    }) 
  }

  errorHandler(error : HttpErrorResponse) {
    console.log("Inside errorHandler====>", error)
    return throwError(error.error.message || 'server Error')
  }

  saveAuthData(expirationDate: Date, token:string, custEmail:string, custUsername:string, custRole:string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('custEmail', custEmail)
    localStorage.setItem('custUsername', custUsername)
    localStorage.setItem('custRole', custRole)
  }
  
  autoAuthCust() {
    const expirationDate : any = localStorage.getItem('expiration')
    const now = new Date()
    const expiresIn = new Date(expirationDate).getTime() - now.getTime()
    if (expiresIn > 0) {
      this.isAuthenticated = true
      this.setAuthTimer(expiresIn / 1000)
    }
  }

  setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  logout() {
    this.token = ''
    this.custEmail = ''
    this.custUsername = ''
    this.custRole = ''
    this.isAuthenticated = false
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    console.log("logout function call from service");
    this.msgServices.success("logout successfully", true)
    this.router.navigate(['/login'])
  }

  clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('custEmail')
    localStorage.removeItem('custUsername')
    localStorage.removeItem('custRole')
  }
}
