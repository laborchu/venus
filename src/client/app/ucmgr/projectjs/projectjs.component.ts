import { Component, OnInit, enableProdMode } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';
import { ProjectJsService } from '../../services/index';

import { ProjectJsModel } from '../../models/index';
import { MvProjectJsFormContent } from '../../shared/projectjs/index';
enableProdMode();
/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	templateUrl: 'projectjs.component.html',
	styleUrls: ['projectjs.component.css']

})
export class ProjectJsComponent implements OnInit{
	projectJs: ProjectJsModel = new ProjectJsModel();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal,
		private projectJsService: ProjectJsService,
		private _notificationsService: NotificationsService
	) { }

	rightBtnConf: any = {
		del:{
			click:()=>{
				this.projectJs.dataStatus = 0;
				this.projectJsService.deleteJs(this.projectJs._id)
					.subscribe(() => {
						this.projectJsService.setProjectJsChangeSubject(this.projectJs);
						this._notificationsService.success(
							'ProjectJs操作',
							'删除成功'
						);
					});
			}
		},
		save: {
			click: () => {
				let updateJs: ProjectJsModel = new ProjectJsModel();
				updateJs._id = this.projectJs._id;
				updateJs.script = this.projectJs.script;
				this.projectJsService.updateScript(updateJs).subscribe(() => {
					this._notificationsService.success(
						'ProjectJs操作',
						'保存成功'
					);
				});
			}
		},
		edit:{
			click:()=>{
				const modalRef: NgbModalRef = this.modalService.open(MvProjectJsFormContent, { backdrop: "static" });
				modalRef.componentInstance.model = this.projectJs;
				modalRef.result.then(() => {
					let updateJs: ProjectJsModel = new ProjectJsModel();
					updateJs._id = this.projectJs._id;
					updateJs.name = this.projectJs.name;
					updateJs.jsName = this.projectJs.jsName;
					this.projectJsService.updateProjectJs(updateJs).subscribe(() => {
						this.projectJsService.setProjectJsChangeSubject(this.projectJs);
						this._notificationsService.success(
							'ProjectJs操作',
							'保存成功'
						);
					});
				}, () => {
				});
			}
		}
	};

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			let jsId = params["jsId"];
			this.projectJsService.getProjectJs(jsId).subscribe((js:Array<ProjectJsModel>)=>{
				this.projectJs = js[0];
				if (this.projectJs.fixed){
					this.rightBtnConf.del.hidden = true;
					this.rightBtnConf.edit.hidden = true;
				} else {
					this.rightBtnConf.del.hidden = false;
					this.rightBtnConf.edit.hidden = false;
				}
			});
		});
	}

	onChange(code: string) {
		this.projectJs.script = code;
	}
}
