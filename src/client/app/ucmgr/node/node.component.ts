import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { NodeModel,PathModel } from '../../models/index';
import { PathService, NodeService } from '../../services/index';
import 'rxjs/add/operator/switchMap';


@Component({
	moduleId:module.id,
	templateUrl:'node.component.html',
	styleUrls:['node.component.css']
})
export class NodeComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private route: ActivatedRoute,
		private nodeService: NodeService,
		private pathService: PathService
	) {}


	navagate:Array<any>;
	nodeModel:NodeModel = new NodeModel();
	nodeTitle:string = "新增节点";

	groupId:string = "";
	ucId: string = "";

	nodeRightBtnConf: Object = {
		save: {
			click: () => {
				this.nodeModel.dataStatus = 1;
				this.nodeModel.ucId = this.ucId;
				this.nodeService.saveNode(this.nodeModel).subscribe((result)=>{
				})
			}
		},
		del: {
			click: () => {
			}
		}
	};

	ngOnInit() {
		this.route.parent.params.subscribe(params => {
			this.groupId = params["groupId"];
		});
		this.route.params.subscribe((params: Params) => {
			let nodeId = params["nodeId"];
			this.ucId = params["ucId"];
			if (nodeId) {
				this.nodeService.getNodes(nodeId).subscribe((nodes: Array<NodeModel>) => {
					this.nodeModel = nodes[0];
					this.nodeTitle = this.nodeModel.title;
					this.ucId = this.nodeModel.ucId;
					this.navagate = ["/ucgroups", this.groupId, "ucs", this.ucId];
				});
			}else{
				this.navagate = ["/ucgroups", this.groupId, "ucs", this.ucId];
			}
		})
	}

	openPath(content:any,path: PathModel) {
		this.modalService.open(content).result.then((result) => {
	    	// debugger
	    }, (reason) => {
	    	// debugger
	    });
	}

}