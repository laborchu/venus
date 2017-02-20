import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProjectModel, UcGroupModel } from '../../models/index';
import { ProjectService, UcGroupService } from '../../services/index';

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
export class MenuComponent implements OnInit{ 
	constructor(
		private modalService: NgbModal,
		private router:Router,
		private projectService: ProjectService,
		private ucGroupService: UcGroupService
	){}
	
	projects: Array<ProjectModel>;
	selectProject: ProjectModel;
	newProject: ProjectModel = new ProjectModel();

	groupArray: Array<UcGroupModel>;
	selectGroup: UcGroupModel;
	newUcGroup: UcGroupModel = new UcGroupModel();
	
	ngOnInit(): void {
		let projectObservable = this.projectService.getProjects();
		let mapProjectUcGroup = projectObservable.concatMap(projects => {
			this.projects = projects;
			this.selectProject = projects[0];
			return this.ucGroupService.getUcGroups(projects[0]._id);
		});
		mapProjectUcGroup.subscribe((ucGroups: Array<UcGroupModel>) => {
			this.groupArray = ucGroups;
			this.selectGroup = ucGroups[0];
		});

		this.ucGroupService.getGroupChangeSubject().subscribe((group: UcGroupModel) => {
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
	}

	doSelectProject(project: ProjectModel) {
		this.selectProject = project;
		this.router.navigate(["/projects", project._id, "ucgroups"])
		this.ucGroupService
			.getUcGroups(project._id)
			.subscribe((ucGroups: Array<UcGroupModel>) => {
			this.groupArray = ucGroups;
		});
	}

	doSelectGroup(group: UcGroupModel) {
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

	openNewProject(content: any) {
		this.modalService.open(content, { backdrop: "static" }).result.then(() => {
			let projectObservable = this.projectService.addProjects(this.newProject);
			let mapObservable = projectObservable.concatMap(result => {
				return this.projectService.getProjects();
			});
			mapObservable.subscribe(projects => {
				this.projects = projects;
			});
		}, () => {
		});
	}

}