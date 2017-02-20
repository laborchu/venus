import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ProjectModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class ProjectService extends MvService {
  private projectUrl:string = 'api/projects';

  constructor(protected http: Http) { 
    super(http);
  }

  getProjects(): Observable<ProjectModel[]> {
     return this.getHttp(this.projectUrl);
  }

  addProjects(project: ProjectModel): Observable<ProjectModel> {
	  return this.postHttp(this.projectUrl, project);
  }
}