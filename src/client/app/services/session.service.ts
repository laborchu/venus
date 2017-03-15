import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Observable';

import { UserModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class SessionService extends MvService {
	private sessionUrl: string = 'open/session';

	constructor(protected router: Router,
		protected http: Http,
		protected _notificationsService: NotificationsService) {
		super(router, http, _notificationsService);
	}

	getSession(): Observable<UserModel> {
		return this.getHttp(this.sessionUrl);
	}
	postSession(user:UserModel): Observable<UserModel> {
		return this.postHttp(this.sessionUrl, user);
	}
}