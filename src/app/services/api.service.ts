import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Constants } from '../global/constants';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = ""
	constructor(
		private constant: Constants,
		private http: HttpClient,
		private msgServices: MessagingService
	) {
		this.apiUrl = `${this.constant.BASE_API_URL}`
	}

  getAllData(apiPath:string): Observable<any> {
		return this.http.get(`${this.apiUrl}/${apiPath}`).pipe(catchError(this.errorHandler))
	}

	getDataById(apiPath:string, id: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/${apiPath}/${id}`).pipe(catchError(this.errorHandler))
	}

	addData(apiPath:string, data: object) {
		this.http.post(`${this.apiUrl}/${apiPath}`, data).pipe(catchError(this.errorHandler)).subscribe(
			response => {
				console.log("After adding=======>", response);
				this.msgServices.success(`${apiPath} added successfully`, true)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
	}

	updateData(apiPath:string, id: string, data: object) {
		this.http.put(`${this.apiUrl}/${apiPath}/${id}`, data).pipe(catchError(this.errorHandler)).subscribe(
			response => {
				console.log("After updating=======>", response);
				this.msgServices.success(`${apiPath} updated successfully`, true)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
	}

	deleteData(apiPath:string, id: string) {
		this.http.delete(`${this.apiUrl}/${apiPath}/${id}`).pipe(catchError(this.errorHandler)).subscribe(
			response => {
				console.log("After deleting=======>", response);
				this.msgServices.success(`${apiPath} deleted successfully`, true)
			}, error => {
				this.msgServices.error(error, true)
			}
		)
	}

	errorHandler(error: HttpErrorResponse) {
		console.log("Inside errorHandler====>", error)
		return throwError(error.error.message || 'server Error')
	}
}
