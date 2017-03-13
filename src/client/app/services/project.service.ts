import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProjectModel } from '../models/index';
import { MvService } from './mv.service';

@Injectable()
export class ProjectService extends MvService {
  private projectChangeSubject: Subject<ProjectModel> = new Subject<ProjectModel>();

  private projectUrl:string = 'api/projects';

  constructor(protected http: Http) { 
    super(http);
  }

  setProjectChangeSubject(projectModel: ProjectModel): void {
    this.projectChangeSubject.next(projectModel);
  }
  getProjectChangeSubject(): Observable<ProjectModel> {
    return this.projectChangeSubject.asObservable();
  }

  getProjects(): Observable<ProjectModel[]> {
     return this.getHttp(this.projectUrl);
  }

  addProjects(project: ProjectModel): Observable<ProjectModel> {
	  return this.postHttp(this.projectUrl, project);
  }

  getGlobalJs(projectId:string,js:string): Observable<ProjectModel[]>{
    let url: string = `api/projects/${projectId}/${js}`;
    return this.getHttp(url);
  }

  generate(projectId: string): Observable<ProjectModel[]> {
    let url: string = `api/projects/${projectId}/generate`;
    return this.getHttp(url);
  }

}