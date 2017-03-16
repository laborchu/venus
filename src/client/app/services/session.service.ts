import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class SessionService extends MvService {
	private sessionUrl: string = 'open/session';
	private sessionChangeSubject: Subject<UserModel> = new Subject<UserModel>();

	constructor(protected router: Router,
		protected http: Http,
		protected _notificationsService: NotificationsService) {
		super(router, http, _notificationsService);
	}

	setSessionChangeSubject(ucModel: UserModel): void {
		this.sessionChangeSubject.next(ucModel);
	}

	getSessionChangeSubject(): Observable<UserModel> {
		return this.sessionChangeSubject.asObservable();
	}

	getSession(): Observable<UserModel> {
		return this.getHttp(this.sessionUrl);
	}
	postSession(user:UserModel): Observable<UserModel> {
		return this.postHttp(this.sessionUrl, user);
	}
}