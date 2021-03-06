import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PathModel,CheckerModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class PathService extends MvService {
	constructor(protected injector: Injector) {
		super(injector);
	}

	getPaths(nodeId: string): Observable<PathModel[]> {
		let url = `api/nodes/${nodeId}/paths`;
		return this.getHttp(url);
	}

  delPath(pathModel: PathModel): Observable<PathModel> {
    let url = `api/nodes/${pathModel.nodeId}/paths/${pathModel._id}`;
		return this.delHttp(url);
	}
  addPath(pathModel: PathModel): Observable<PathModel> {
		let url = `api/nodes/${pathModel.nodeId}/paths`;
		return this.postHttp(url,pathModel);
	}
  getChecker(pathModel: PathModel): Observable<CheckerModel[]> {
    let url = `api/nodes/${pathModel.nodeId}/paths/${pathModel._id}`;
    return this.getHttp(url);
  }
  updatePath(pathModel: PathModel): Observable<PathModel> {
    let url = `api/nodes/${pathModel.nodeId}/paths`;
    return this.patchHttp(url, pathModel);
  }

	getNode(pathId: number): Observable<PathModel> {
		let url = `api/paths/${pathId}`;
		return this.getHttp(url);
	}
}
