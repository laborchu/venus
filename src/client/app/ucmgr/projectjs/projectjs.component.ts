import { Component, OnInit, enableProdMode } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { ProjectJsService } from '../../services/index';

import { ProjectJsModel } from '../../models/index';
enableProdMode();
/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	template: `
	<mv-nav [title]="projectJs.jsCode" [rightBtnConf]="rightBtnConf" ></mv-nav>
     <div ace-editor
		 [(text)]="projectJs.script"
	     [mode]="'javascript'"
	       ></div>
  `,
	styleUrls: ['projectjs.component.css']

})
export class ProjectJsComponent implements OnInit{
	projectJs: ProjectJsModel = new ProjectJsModel();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private projectJsService: ProjectJsService,
		private _notificationsService: NotificationsService
	) { }

	rightBtnConf: Object = {
		save: {
			click: () => {
				this.projectJsService.updateScript(this.projectJs).subscribe(() => {
					this._notificationsService.success(
						'ProjectJs操作',
						'保存成功'
					);
				});
			}
		}
	};

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			let jsId = params["jsId"];
			this.projectJsService.getProjectJs(jsId).subscribe((js:Array<ProjectJsModel>)=>{
				this.projectJs = js[0];
			});
		});
		// alert(JSON.stringify(Object.getOwnPropertyNames(this.pathModel)));
	}
}
