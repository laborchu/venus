import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { NodeModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class NodeService extends MvService {
	private projectUrl: string = 'api/projects';

	constructor(protected http: Http) {
		super(http);
	}

	getNodes(ucId:number): Observable<NodeModel[]> {
		let url = `api/nodes?ucId=^${ucId}$`;
		return this.getHttp(url);
	}

	getNode(nodeId: number): Observable<NodeModel> {
		let url = `api/nodes/${nodeId}`;
		return this.getHttp(url);
	}
}