import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { UcService, UcGroupService, ProjectService } from '../../services/index';
import { UcModel, ProjectModel, UcGroupModel } from '../../models/index';

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
		private _notificationsService: NotificationsService
	) { }
	groupId: string;
	projectId: string;

	public options = {
		position: ["bottom", "right"],
		timeOut: 3000
	}

	ngOnInit(): void {
		this.ucGroupService.getSelectGroupSubject().subscribe((ucGroupModel: UcGroupModel) => {
			this.groupId = ucGroupModel._id;
		})
		this.projectService.getProjectChangeSubject().subscribe((project: ProjectModel) => {
			this.projectId = project._id;
		})
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
			uc.build = true;
			uc.dataStatus = 1;
			this.route.params
				.switchMap((params: Params) => this.ucService.addUc(uc))
				.subscribe((result: UcModel) => {
					this.ucService.setUcChangeSubject(result);
					this.router.navigate(['/ucgroups', uc.groupId, 'ucs', result._id]);
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
}
