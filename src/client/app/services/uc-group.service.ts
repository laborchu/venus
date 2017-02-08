import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UcGroupModel } from '../models/index';

import { MvService } from './mv.service';


@Injectable()
export class UcGroupService extends MvService {
	constructor(protected http: Http) {
		super(http);
	}


	getUcGroups(projectId: string): Observable<UcGroupModel[]> {
		let ucGroupUrl = `api/ucgroups?projectId=${projectId}`;
		return this.getHttp(ucGroupUrl);
	}


}