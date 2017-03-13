import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProjectJsModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class ProjectJsService extends MvService {
  private projectJsChangeSubject: Subject<ProjectJsModel> = new Subject<ProjectJsModel>();

  constructor(protected http: Http) {
    super(http);
  }

  getProjectJsList(projectId: string): Observable<ProjectJsModel[]> {
    let url: string = `api/projects/${projectId}/js`;
    return this.getHttp(url);
  }


  getProjectJs(jsId:string): Observable<ProjectJsModel[]> {
    let url: string = `api/projectjs/${jsId}`;
    return this.getHttp(url);
  }

  addProjectJs(project: ProjectJsModel): Observable<ProjectJsModel> {
	  let url: string = `api/projects/${project.projectId}/js`;
	  return this.postHttp(url, project);
  }

  updateScript(projectJs: ProjectJsModel): Observable<ProjectJsModel> {
    let url: string = `api/projectjs/${projectJs._id}/script`;
    return this.patchHttp(url, projectJs);
  }
}