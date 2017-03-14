import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { ProjectModel, IosProjectModel, UcGroupModel, ProjectJsModel, ProjectHelper } from '../../models/index';
import { ProjectService, UcGroupService, ProjectJsService } from '../../services/index';

import { MvProjectJsFormContent } from '../projectjs/index';

import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concatMap';
/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	selector: 'mv-menu',
	templateUrl: 'menu.component.html',
	styleUrls: ['menu.component.css'],
})
export class MenuComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private projectService: ProjectService,
		private projectJsService: ProjectJsService,
		private ucGroupService: UcGroupService,
		private _notificationsService: NotificationsService
	) { }

	projects: Array<ProjectModel>;
	selectProject: ProjectModel;
	newProject: ProjectModel = new IosProjectModel();
	platformTypes: Array<String> = ProjectHelper.getTypes();
	platformFieldSet: Set<String> = ProjectHelper.getField(this.newProject);

	groupArray: Array<UcGroupModel>;
	selectGroup: UcGroupModel;
	newUcGroup: UcGroupModel = new UcGroupModel();

	projectJsArray: Array<ProjectJsModel>;
	selectJs: ProjectJsModel;
	newProjectJs: ProjectJsModel = new ProjectJsModel();

	ngOnInit(): void {
		let projectObservable = this.projectService.getProjects();
		let mapUcGroup = projectObservable.concatMap(projects => {
			this.projects = projects;
			this.selectProject = projects[0];
			this.projectService.setProjectChangeSubject(this.selectProject);
			return this.ucGroupService.getUcGroups(projects[0]._id);
		});
		mapUcGroup.subscribe((ucGroups: Array<UcGroupModel>) => {
			this.groupArray = ucGroups;
			this.selectGroup = ucGroups[0];
		});

		let mapProjectJs = projectObservable.concatMap(projects => {
			return this.projectJsService.getProjectJsList(projects[0]._id);
		});
		mapProjectJs.subscribe((array: Array<ProjectJsModel>) => {
			this.projectJsArray = array;
			if (array.length > 0) {
				this.selectJs = array[0];
			}
		});

		this.ucGroupService.getUpdateGroupSubject().subscribe((group: UcGroupModel) => {
			this.groupArray.every((e: UcGroupModel, index: number) => {
				if (group._id == e._id) {
					this.groupArray[index] = group;
					return false;
				} else {
					return true;
				}
			});
			if (this.selectGroup._id == group._id) {
				this.selectGroup = group;
			}
		});

		this.projectJsService.getProjectJsChangeSubject().subscribe((projectJs: ProjectJsModel) => {
			this.projectJsArray.every((e: ProjectJsModel, index: number) => {
				if (projectJs._id === e._id) {
					if (projectJs.dataStatus === 0) {
						this.projectJsArray.splice(index, 1);
						if (this.projectJsArray.length > 0) {
							this.selectJs = this.projectJsArray[0];
							this.router.navigate(["/projects", this.selectProject._id, "projectjs", this.selectJs._id])
						} else {
							this.selectJs = null;
						}
					} else {
						this.projectJsArray[index] = projectJs;
					}
					return false;
				} else {
					return true;
				}
			});
			if (projectJs.dataStatus === 1 && this.selectJs._id == projectJs._id) {
				this.selectJs = projectJs;
			}
		})
	}

	doSelectProject(project: ProjectModel) {
		this.selectProject = project;
		this.projectService.setProjectChangeSubject(this.selectProject);
		this.router.navigate(["/projects", project._id, "ucgroups"])
		this.ucGroupService
			.getUcGroups(project._id)
			.concatMap((ucGroups: Array<UcGroupModel>) => {
				this.groupArray = ucGroups;
				return this.projectJsService.getProjectJsList(project._id);
			})
			.subscribe((array: Array<ProjectJsModel>) => {
				this.projectJsArray = array;
				if (array.length > 0) {
					this.selectJs = array[0];
				}
			});
	}

	doSelectGroup(group: UcGroupModel) {
		this.selectJs = null;
		this.selectGroup = group;
		this.router.navigate(["/ucgroups", group._id]);
	}

	openUcGroup(content: any) {
		this.modalService.open(content, { backdrop: "static" }).result.then(() => {
			this.newUcGroup.projectId = this.selectProject._id;
			let ucGroupObservable = this.ucGroupService.addUcGroups(this.newUcGroup);
			let mapObservable = ucGroupObservable.concatMap(result => {
				return this.ucGroupService.getUcGroups(this.selectProject._id);
			});
			mapObservable.subscribe((ucGroups: Array<UcGroupModel>) => {
				this.groupArray = ucGroups;
			});
		}, () => {
		});
	}

	openNewProject(content: any, project?: ProjectModel) {
		if (project) {
			this.newProject = project;
			this.platformFieldSet = ProjectHelper.getField(this.newProject);
		}
		this.modalService.open(content, { backdrop: "static" }).result.then(() => {
			let projectObservable: any = null;
			if (this.newProject._id) {
				projectObservable = this.projectService.updateProject(this.newProject);
			} else {
				projectObservable = this.projectService.addProjects(this.newProject);
			}
			let mapObservable = projectObservable.concatMap((result: any) => {
				this._notificationsService.success(
					'project操作',
					'保存成功'
				);
				return this.projectService.getProjects();
			});
			mapObservable.subscribe((projects: Array<ProjectModel>) => {
				this.projects = projects;
			});
		}, () => {
		});
	}

	platformTypeChange(type: string) {
		[this.newProject, this.platformFieldSet] = ProjectHelper.buildModel(type, this.newProject);
	}

	openNewProjectJs(content: any) {
		const modalRef: NgbModalRef = this.modalService.open(MvProjectJsFormContent, { backdrop: "static" });
		modalRef.componentInstance.model = this.newProjectJs;
		modalRef.result.then(() => {
			this.newProjectJs.projectId = this.selectProject._id;
			this.newProjectJs.fixed = false;
			this.newProjectJs.dataStatus = 1;
			let projectJsObservable = this.projectJsService.addProjectJs(this.newProjectJs);
			let mapObservable = projectJsObservable.concatMap(result => {
				return this.projectJsService.getProjectJsList(this.selectProject._id);
			});
			mapObservable.subscribe((projectJs: Array<ProjectJsModel>) => {
				this.projectJsArray = projectJs;
				this.newProjectJs = new ProjectJsModel();
			});
		}, () => {
		});
	}

	doSelectJs(js: ProjectJsModel) {
		this.selectGroup = null;
		this.selectJs = js;
	}

}
