import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { NodeModel, PathModel, PathHelper, CheckHelper, CheckerModel } from '../../models/index';
import { PathService, NodeService } from '../../services/index';
import 'rxjs/add/operator/switchMap';


@Component({
	moduleId: module.id,
	templateUrl: 'node.component.html',
	styleUrls: ['node.component.css']
})
export class NodeComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private route: ActivatedRoute,
		private nodeService: NodeService,
		private pathService: PathService
	) { }


	@ViewChild('form') public form: NgForm;
	@ViewChild('content') public pathContent: any;

	navagate: Array<any>;
	nodeModel: NodeModel = new NodeModel();
	nodeTitle: string = "新增节点";
	pathTitle: string = "新增path";
	checkTitle: string = "验证";

	pathModel: PathModel = new PathModel();
	checkerModel: CheckerModel = new CheckerModel();
	pathFieldSet: Set<String> = new Set();
	checkFieldSet: Set<String> = new Set();
	pathTypes: Array<String> = PathHelper.getTypes();
	selectors: Array<String> = PathHelper.getSelector();
	checks: Array<String> = CheckHelper.getTypes();
	groupId: string = "";
	projectId: string = "";
	ucId: string = "";
	nodeId: string = "";
	checkIndex: number
	nodeRightBtnConf: Object = {
		save: {
			click: () => {
				this.nodeModel.dataStatus = 1;
				this.nodeModel.ucId = this.ucId;
				this.nodeService.saveNode(this.nodeModel).subscribe((result) => {
					if (this.nodeModel._id) {
						this.form.form.markAsPristine();
					} else {
						this.router.navigate(["/projects", this.projectId, "ucgroups", this.groupId, "ucs", this.ucId]);
					}
				})
			}
		},
		del: {
			click: () => {
				this.nodeService.delNode(this.nodeModel._id).subscribe(() => {
					this.router.navigate(["/projects", this.projectId, "ucgroups", this.groupId, "ucs", this.ucId]);
				});
			}
		}
	};

	pathRightBtnConf: Object = {
		add: {
			click: () => {
				this.pathModel = new PathModel();
				this.pathModel.nodeId = this.nodeId
				this.modalService.open(this.pathContent, { backdrop: "static", size: "lg" }).result.then((result) => {
					this.pathModel = PathHelper.setFilter(this.pathModel)
					this.pathService.addPath(this.pathModel)
						.subscribe((newPath: PathModel) => {
							this.nodeModel.paths.push(newPath)
						});
				}, (reason) => {
					// debugger
				});
			}
		}
	};

	ngOnInit() {
		this.route.parent.params.subscribe(params => {
			this.groupId = params["groupId"];
		});
		this.route.parent.parent.params.subscribe(params => {
			this.projectId = params["projectId"];
		});

		this.route.params.subscribe((params: Params) => {
			let nodeId = params["nodeId"];
			this.nodeId = params["nodeId"];
			this.ucId = params["ucId"];
			if (nodeId) {
				this.nodeService.getNodes(nodeId)
					.concatMap((nodes: Array<NodeModel>) => {
						this.nodeModel = nodes[0];
						this.nodeTitle = this.nodeModel.title;
						this.ucId = this.nodeModel.ucId;
						this.nodeId = nodeId;
						this.navagate = ["/projects", this.projectId, "ucgroups", this.groupId, "ucs", this.ucId];
						return this.pathService.getPaths(nodeId);
					})
					.subscribe((paths: Array<PathModel>) => {
						this.nodeModel.paths = paths;
					});
			} else {
				this.navagate = ["/projects", this.projectId, "ucgroups", this.groupId, "ucs", this.ucId];
			}
		});
		// alert(JSON.stringify(Object.getOwnPropertyNames(this.pathModel)));
	}

	typeChange(type: string) {
		[this.pathModel, this.pathFieldSet] = PathHelper.buildModel(type, this.pathModel);
	}

	checkChange(type: string) {
		[this.checkerModel, this.checkFieldSet] = CheckHelper.buildModel(type, this.checkerModel);
	}
	openChecker(checker: CheckerModel, index: number) {
		this.checkerModel = checker
		this.checkIndex = index
		this.checkChange(checker.type)
	}
	delChecker(index: number) {
		this.pathModel.checker.splice(index, 1)
	}
  delPath(path: PathModel, index: number) {
    this.pathService.delPath(path)
      .subscribe((path: PathModel) => {
        this.nodeModel.paths.splice(index,1)
      });
  }
	openPath(path: PathModel, index: number) {
		this.pathModel = path
		this.typeChange(path.type)
		this.pathService.getChecker(this.pathModel)
			.subscribe((checkers: Array<CheckerModel>) => {
				this.pathModel.checker = checkers
			});
		this.modalService.open(this.pathContent, { backdrop: "static", size: "lg" }).result.then(() => {
			this.pathModel = PathHelper.setFilter(this.pathModel)
			this.pathService.updatePath(this.pathModel)
				.subscribe((newPath: PathModel) => {
					this.nodeModel.paths[index] = this.pathModel;
				});
		}, (reason) => {
		});
	}

	rightBtnConf: Object = {
		save: {
			click: () => {
				if (this.checkIndex && this.checkIndex >= 0) {
					this.pathModel.checker[this.checkIndex] = this.checkerModel
				} else {
					if (!this.pathModel.checker) {
						this.pathModel.checker = []
					}
					this.pathModel.checker.push(this.checkerModel)
				}
				this.checkerModel = new CheckerModel()
				this.checkIndex = -1
			}
		},
		add: {
			click: () => {
				this.checkerModel = new CheckerModel()
				this.checkIndex = -1
			}
		}
	};

}
