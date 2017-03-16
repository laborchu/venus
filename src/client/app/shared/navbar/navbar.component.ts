import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';


import { UcService, UcGroupService,UserService,ProjectService,SessionService } from '../../services/index';
import { UcModel, ProjectModel, UcGroupModel,UserModel } from '../../models/index';


/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	selector: 'mv-navbar',
	templateUrl: 'navbar.component.html',
	styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private ucService: UcService,
		private ucGroupService: UcGroupService,
		private projectService: ProjectService,
		private _notificationsService: NotificationsService,
		private modalService:NgbModal,
		private sessionService:SessionService,
		private userService:UserService

		
	) { }
	groupId: string;
	projectId: string;
	user:UserModel=new UserModel();		
	@ViewChild('newUcView') newUcView: any;

	ngOnInit(): void {
		this.ucGroupService.getSelectGroupSubject().subscribe((ucGroupModel: UcGroupModel) => {
			this.groupId = ucGroupModel._id;
		})
		this.projectService.getProjectChangeSubject().subscribe((project: ProjectModel) => {
			this.projectId = project._id;
		})


		this.sessionService.getSessionChangeSubject().subscribe((user:UserModel)=>{

			this.user=user;
			
		});
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: any) {
		if (event.target.tagName == "BODY") {
			if (event.keyCode == 110 || event.keyCode ==78){
				this.newUcView.open();
				this.popNewUcClick();
			}
		}
	}

	popNewUcClick(): void {
		setTimeout(function() {
			let newUcInput = document.getElementById("newUcInput");
			if (newUcInput) {
				newUcInput.focus();
			}
		}, 100);
	}

	addUc(value: string, newUcView: any): void {
		if (value) {
			let uc: UcModel = new UcModel();
			uc.title = value;
			uc.groupId = this.groupId;
			uc.projectId = this.projectId;
			uc.build = true;
			uc.dataStatus = 1;
			this.route.params
				.switchMap((params: Params) => this.ucService.addUc(uc))
				.subscribe((result: UcModel) => {
					this.ucService.setUcChangeSubject(result);
					this.router.navigate(["/projects", this.projectId, 'ucgroups', uc.groupId, 'ucs', result._id]);
				});
			newUcView.close();
		}
	}

	generate(): void {
		this.projectService.generate(this.projectId).subscribe(() => {
			this._notificationsService.success(
				'Project生成操作',
				'生成成功'
			);
		});
	}

	openUserSetting(content: any) {
			this.modalService.open(content, { backdrop: "static" }).result.then(() => {
				
		}, () => {
			//保存
			this.userService.updateUser(this.user);
			debugger
		});
	}




}
