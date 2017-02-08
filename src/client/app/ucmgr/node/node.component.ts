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
	pathList: Array<PathModel>;
	modelTitle:string = "路径";

	ngOnInit() {
		let groupId = 0;
		this.route.parent.params.subscribe(params => {
			groupId = +params["id"];
		});
		this.route.params
			.switchMap((params: Params) => this.nodeService.getNode(+params["nodeId"]))
			.switchMap((node: NodeModel) => {
				this.nodeModel = node;
				this.navagate = ['/ucgroup', groupId, 'uc', node.ucId];
				return this.pathService.getPaths(node.id);
			})
			.subscribe(pathList => {
				this.pathList = pathList;
			});
	}

	openPath(content:any,path: PathModel) {
		this.modalService.open(content).result.then((result) => {
	    	// debugger
	    }, (reason) => {
	    	// debugger
	    });
	}

}