import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Observable';

import { NodeModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class NodeService extends MvService {
	private projectUrl: string = 'api/projects';

	constructor(protected router: Router,
		protected http: Http,
		protected _notificationsService: NotificationsService) {
		super(router, http, _notificationsService);
	}

	getNodes(nodeId: string): Observable<NodeModel[]> {
		let url = `api/nodes/${nodeId}`;
		return this.getHttp(url);
	}

	getUcNodes(ucId: string): Observable<NodeModel[]> {
		let url = `/api/ucs/${ucId}/nodes`;
		return this.getHttp(url);
	}

	saveNode(nodeModel: NodeModel): Observable<NodeModel> {
		let url = `/api/ucs/${nodeModel.ucId}/nodes`;
		return this.putHttp(url, nodeModel);
	}

	delNode(nodeId: string): Observable<NodeModel> {
		let url = `api/nodes/${nodeId}`;
		return this.delHttp(url);
	}
}