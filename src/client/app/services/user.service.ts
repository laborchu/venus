import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserModel } from '../models/index';

import { MvService } from './mv.service';


@Injectable()
export class UserService extends MvService {

	private ucChangeSubject: Subject<UserModel> = new Subject<UserModel>();

	constructor(protected injector: Injector) {
		super(injector);
	}

	
	
	updateUser(user: UserModel): Observable<UserModel> {
		let url = `/api/user/setting`;
		return this.patchHttp(url, user);
	}



}