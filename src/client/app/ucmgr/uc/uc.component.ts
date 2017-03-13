import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { UcModel, NodeModel,UcHelper } from '../../models/index';
import { UcService, NodeService } from '../../services/index';
import 'rxjs/add/operator/switchMap';

/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	templateUrl: 'uc.component.html',
	styleUrls: ['uc.component.css'],
})
export class UcComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private ucService: UcService,
		private nodeService: NodeService,
		private _notificationsService: NotificationsService
	) { }
	ucMode: UcModel = new UcModel();
	ucKeyStr: string = "";

	@ViewChild('form') public form: NgForm;

	rightBtnConf: Object = {
		save: {
			click: () => {
				this.ucService.updateUc(this.ucMode)
					.subscribe(() => {
						this.ucService.setUcChangeSubject(this.ucMode);
						this.form.form.markAsPristine();
					});
			}
		},
		del: {
			click: () => {
				this.ucMode.dataStatus = 0;
				this.ucService.deleteUc(this.ucMode._id)
					.subscribe(() => {
						this.ucService.setUcChangeSubject(this.ucMode);
						this.router.navigate(['/ucgroups', this.ucMode.groupId])
					});
			}
		},
		code: {
			finish: (text: string) => {
				this.ucMode.code = text;
				this.ucService.updateUcScript(this.ucMode)
					.concatMap(()=>{
						return this.ucService.getUc(this.ucMode._id);
					})
					.subscribe((ucs: Array<UcModel>) => {
						this.form.form.markAsPristine();
						this.ucMode = ucs[0];
						this.ucService.setUcChangeSubject(this.ucMode);
						this._notificationsService.success(
							'UC操作',
							"操作成功"
						);
					}, (msg) => {
						this._notificationsService.error(
							'UC操作',
							msg
						);
					});
			}
		}
	};

	nodeRightBtnConf: Object = {
		add: {
			click: () => {
				this.router.navigate(['/ucgroups', this.ucMode.groupId, 'ucs', this.ucMode._id, 'nodes'])
			}
		}
	};

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.ucService.getUc(params["ucId"]))
			.switchMap((ucs: Array<UcModel>) => {
				this.ucMode = ucs[0];
				return this.nodeService.getUcNodes(this.ucMode._id);
			})
			.subscribe((nodes: Array<NodeModel>) => {
				this.ucMode.nodes = nodes;
				this.form.form.markAsPristine();
			});
	}

	showNode(node: NodeModel) {
		this.router.navigate(['/ucgroups', this.ucMode.groupId, 'nodes', node._id]);
	}

	delNode(delNode: NodeModel) {
		this.nodeService.delNode(delNode._id).subscribe(() => {
			this.ucMode.nodes.every((node, index) => {
				if (delNode._id == node._id) {
					this.ucMode.nodes.splice(index, 1);
					return false;
				} else {
					return true;
				}
			})
		});
	}
}
