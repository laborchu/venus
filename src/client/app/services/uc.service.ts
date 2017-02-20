import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UcModel } from '../models/index';

import { MvService } from './mv.service';


@Injectable()
export class UcService extends MvService {

	private ucChangeSubject: Subject<UcModel> = new Subject<UcModel>();

	constructor(protected http: Http) {
		super(http);
	}

	setUcChangeSubject(ucModel: UcModel): void {
		this.ucChangeSubject.next(ucModel);
	}
	getUcChangeSubject(): Observable<UcModel> {
		return this.ucChangeSubject.asObservable();
	}


	getUcs(groupId: string): Observable<UcModel[]> {
		let url = `/api/ucgroups/${groupId}/ucs`;
		return this.getHttp(url);
	}

	getUc(id: string): Observable<UcModel[]> {
		let url = `/api/ucs/${id}`;
		return this.getHttp(url);
	}

	addUc(uc: UcModel): Observable<UcModel> {
		let ucGroupUrl = `/api/ucgroups/${uc.groupId}/ucs`;
		return this.postHttp(ucGroupUrl, uc);
	}

	updateUc(uc: UcModel): Observable<UcModel> {
		let url = `/api/ucs/${uc._id}`;
		return this.patchHttp(url, uc);
	}

	deleteUc(id: string): Observable<UcModel> {
		let url = `/api/ucs/${id}`;
		return this.delHttp(url);
	}

}