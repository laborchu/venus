import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UcGroupModel } from '../models/index';

import { MvService } from './mv.service';


@Injectable()
export class UcGroupService extends MvService {
	private groupChangeSubject: Subject<UcGroupModel> = new Subject<UcGroupModel>();
	constructor(protected http: Http) {
		super(http);
	}

	setGroupChangeSubject(ucModel: UcGroupModel): void {
		this.groupChangeSubject.next(ucModel);
	}
	getGroupChangeSubject(): Observable<UcGroupModel> {
		return this.groupChangeSubject.asObservable();
	}

	getUcGroup(groupdId: string): Observable<UcGroupModel[]> {
		let ucGroupUrl = `api/ucgroups/${groupdId}`;
		return this.getHttp(ucGroupUrl);
	}

	getUcGroups(projectId: string): Observable<UcGroupModel[]> {
		let ucGroupUrl = `api/projects/${projectId}/ucgroups`;
		return this.getHttp(ucGroupUrl);
	}

	addUcGroups(ucGroup: UcGroupModel): Observable<UcGroupModel> {
		let ucGroupUrl = `api/projects/${ucGroup.projectId}/ucgroups`;
		return this.postHttp(ucGroupUrl, ucGroup);
	}

	updateUcGroups(ucGroup: any): Observable<UcGroupModel> {
		let ucGroupUrl = `api/ucgroups/${ucGroup._id}`;
		return this.patchHttp(ucGroupUrl, ucGroup);
	}
}