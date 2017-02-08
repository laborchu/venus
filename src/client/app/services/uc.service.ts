import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UcModel } from '../models/index';

import { MvService } from './mv.service';


@Injectable()
export class UcService extends MvService {
	constructor(protected http: Http) {
		super(http);
	}


	getUcs(groupId: number): Observable<UcModel[]> {
		let url = `api/ucs?groupId=^${groupId}$`;
		return this.getHttp(url);
	}

	getUc(id: number): Observable<UcModel> {
		let url = `api/ucs/${id}`;
		return this.getHttp(url);
	}


}