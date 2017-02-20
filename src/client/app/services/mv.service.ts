import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ProjectModel } from '../models/index';

export abstract class MvService {
	constructor(protected http: Http) {
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

	private extractData(res: Response) {
		let body = res.json();
		return body.data || {};
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