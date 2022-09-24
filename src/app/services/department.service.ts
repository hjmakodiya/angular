import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Constants } from '../global/constants';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
	apiUrl : string = ""
	productList : {}
	constructor(
		private constant : Constants,
		private http : HttpClient,
		private msgServices : MessagingService
	) { 
		this.apiUrl = `${this.constant.BASE_API_URL}${this.constant.API_DEPARTMENT_PATH}`
	}

	getAllDepartments() : Observable<any> {
		return this.http.get(this.apiUrl).pipe(catchError(this.errorHandler))
	}

  getDepartmentById(id : string) : Observable<any> {
		return this.http.get(`${this.apiUrl}/${id}`).pipe(catchError(this.errorHandler))
	}

	addDepartment(data:object) {
		this.http.post(this.apiUrl, data).pipe(catchError(this.errorHandler)).subscribe(
			response=>{
				console.log("After adding=======>", response);
				this.msgServices.success("Department added successfully", true)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
	}

	updateDepartment(id:string, data:object) {
		this.http.put(`${this.apiUrl}/${id}`, data).pipe(catchError(this.errorHandler)).subscribe(
			response=>{
				console.log("After updating=======>", response);
				this.msgServices.success("Department updated successfully", true)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
	}

	deleteDepartment(id:string) {
		this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.errorHandler)).subscribe(
			response=>{
				console.log("After deleting=======>", response);
				this.msgServices.success("Department deleted successfully", true)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
	}

	errorHandler(error:HttpErrorResponse) {
    console.log("Inside errorHandler====>", error)
    return throwError(error.error.message || 'server Error')
  }
}
