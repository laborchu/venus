import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class SessionService extends MvService {
	private sessionUrl: string = 'open/session';
	private sessionChangeSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

	constructor(protected injector: Injector) {
		super(injector);
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
	postSession(user:UserModel): Observable<Array<UserModel>> {
		return this.postHttp(this.sessionUrl, user);
	}

    deleteSession(): Observable<UserModel> {
    	let url = `/logout`;
		return this.delHttp(url);
	}



}