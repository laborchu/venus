import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Response, Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ProjectModel } from '../models/index';

export abstract class MvService {
	constructor(
		protected router: Router,
		protected http: Http,
		protected _notificationsService: NotificationsService) {
	}

	getHttp(url: string, extractData = this.extractData): Observable<any> {
		return this.http.get(url)
			.map(extractData)
			.catch(this.handleError);
	}

	postHttp(url: string, data: Object, extractData = this.extractData): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, data, options)
			.map(extractData)
			.catch(this.handleError);
	}

	patchHttp(url: string, data: Object, extractData = this.extractData): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.patch(url, data, options)
			.map(extractData)
			.catch(this.handleError);
	}

	delHttp(url: string, extractData = this.extractData): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.delete(url, options)
			.map(extractData)
			.catch(this.handleError);
	}

	putHttp(url: string, data: Object, extractData = this.extractData): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.put(url, data, options)
			.map(extractData)
			.catch(this.handleError);
	}

	extractData = (res: Response)=> {
		let body = res.json();
		if (body.code == 1) {
			return body.data || {};
		} else if (body.code == 2) {
			this.router.navigate(['/login']);
		} else if (body.code == 0) {
			
			this._notificationsService.error(
				'错误',
				body.msg
			);
		} else {
			throw new Error(body.msg);
		}
	}

	private handleError(error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}