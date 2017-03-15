import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UcGroupModel } from '../models/index';

import { MvService } from './mv.service';


@Injectable()
export class UcGroupService extends MvService {
	private selectGroupSubject: Subject<UcGroupModel> = new Subject<UcGroupModel>();
	private updateGroupSubject: Subject<UcGroupModel> = new Subject<UcGroupModel>();
	constructor(protected router: Router,
		protected http: Http,
		protected _notificationsService: NotificationsService) {
		super(router, http, _notificationsService);
	}

	setSelectGroupSubject(ucModel: UcGroupModel): void {
		this.selectGroupSubject.next(ucModel);
	}
	getSelectGroupSubject(): Observable<UcGroupModel> {
		return this.selectGroupSubject.asObservable();
	}
	setUpdateGroupSubject(ucModel: UcGroupModel): void {
		this.updateGroupSubject.next(ucModel);
	}
	getUpdateGroupSubject(): Observable<UcGroupModel> {
		return this.updateGroupSubject.asObservable();
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