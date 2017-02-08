import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { PathModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class PathService extends MvService {
	constructor(protected http: Http) {
		super(http);
	}

	getPaths(nodeId: Number): Observable<PathModel[]> {
		let url = `api/paths?nodeId=^${nodeId}$`;
		return this.getHttp(url);
	}

	getNode(pathId: number): Observable<PathModel> {
		let url = `api/paths/${pathId}`;
		return this.getHttp(url);
	}
}