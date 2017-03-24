import { Component,Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DragulaService } from 'ng2-dragula';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MvCodeJsFormContent } from  '../../shared/mv-nav/index';

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
		private _notificationsService: NotificationsService,
		private dragulaService: DragulaService,
        private modalService: NgbModal
	) { }

    code: string = "";
	ucMode: UcModel = new UcModel();
	nodes: Array<NodeModel> = [];
	ucKeyStr: string = "";
	projectId: string = "";
	groupInfoHeight: number = window.innerHeight - 90;
	@ViewChild('form') public form: NgForm;

    onChange(code:string) {
      this.code = code;
    }
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
						this.router.navigate(["/projects", this.projectId, 'ucgroups', this.ucMode.groupId])
					});
			}
		},
		code: {
      codeClick:() =>{
        const modalRef: NgbModalRef =  this.modalService.open(MvCodeJsFormContent, { backdrop: "static",size:'lg'})
        modalRef.result.then((code) => {
          this.ucMode.code = code;
          this.ucService.updateUcScript(this.ucMode)
            .concatMap((result)=>{
              if(result){
                this._notificationsService.success(
                  'UC操作',
                  "操作成功"
                );
              }
              return this.ucService.getUc(this.ucMode._id);
            })
            .subscribe((ucs: Array<UcModel>) => {
              this.form.form.markAsPristine();
              this.ucMode = ucs[0];
              this.ucService.setUcChangeSubject(this.ucMode);
              this.nodeService.getUcNodes(this.ucMode._id)	.subscribe((nodes: Array<NodeModel>) => {
                this.nodes = nodes;
              });
            }, (msg) => {
              this._notificationsService.error(
                'UC操作',
                msg
              );
            });
        }, () => {
        });
        modalRef.componentInstance.code = this.ucMode.code;
      }
		}
	};

	nodeRightBtnConf: Object = {
		add: {
			click: () => {
				this.router.navigate(["/projects", this.projectId, 'ucgroups', this.ucMode.groupId, 'ucs', this.ucMode._id, 'nodes'])
			}
		}
	};

	ngOnInit() {
		this.route.parent.parent.params.subscribe(params => {
			this.projectId = params["projectId"];
		});

		this.route.params
			.switchMap((params: Params) => this.ucService.getUc(params["ucId"]))
			.switchMap((ucs: Array<UcModel>) => {
				this.ucMode = ucs[0];
				return this.nodeService.getUcNodes(this.ucMode._id);
			})
			.subscribe((nodes: Array<NodeModel>) => {
				this.nodes = nodes;
				this.form.form.markAsPristine();
			});

		this.dragulaService.dropModel.subscribe((value: any) => {
			if (value[0] == "node-list") {
				this.onDrop(value.slice(1));
			}
		});

		this.dragulaService.setOptions('node-list', {
			moves: function(el: any, container: any, handle: any) {
				return !handle.classList.contains("is-parent");
			}
		});

	}

  SethandlerCode() {
    const modalRef: NgbModalRef =  this.modalService.open(MvCodeJsFormContent, { backdrop: "static",size:'lg'})
    modalRef.result.then((code) => {
      this.ucMode.handlerCode = code;
    }, () => {
    });
    modalRef.componentInstance.code = this.ucMode.handlerCode;
	}

	ngOnDestroy() {
		this.dragulaService.destroy("node-list");
	}

	onResize(event: any) {
		this.groupInfoHeight = event.target.innerHeight - 90;
	}

	showNode(node: NodeModel) {
		this.router.navigate(["/projects", this.projectId, 'ucgroups', this.ucMode.groupId, 'nodes', node._id]);
	}

	delNode(delNode: NodeModel) {
		this.nodeService.delNode(delNode._id).subscribe(() => {
			this.nodes.every((node, index) => {
				if (delNode._id == node._id) {
					this.nodes.splice(index, 1);
					return false;
				} else {
					return true;
				}
			})
		});
	}

	onDrop(args: any) {
		let [el, parents] = args;
		let dragTo = [].slice.call(el.parentElement.children).indexOf(el);

		let curNode: NodeModel = this.nodes[dragTo];
		let preOrder = 0;
		let nextOrder = 0;
		let curOrder = 0;
		if (dragTo != 0) {
			let preNode: NodeModel = this.nodes[dragTo - 1];
			preOrder = preNode.order;
			if (preNode.isParent) {
				curNode.parentId = preNode._id;
			}else{
				curNode.parentId = preNode.parentId;
			}
		}else{
			curNode.isParent = false;
			curNode.parentId = null;
		}
		if (dragTo != (this.nodes.length - 1)) {
			let nextNode: NodeModel = this.nodes[dragTo + 1];
			nextOrder = nextNode.order;
		} else {
			curOrder = +(preOrder + 0.01).toFixed(0);
		}
		if (curOrder == 0) {
			curOrder = (preOrder + nextOrder) / 2;
		}
		curNode.order = curOrder;
		this.nodeService.saveNode(curNode).subscribe(() => { });
	}
}
