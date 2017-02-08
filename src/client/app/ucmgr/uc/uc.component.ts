import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UcModel,NodeModel } from '../../models/index';
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
		private nodeService: NodeService
	) { }
	ucMode: UcModel = new UcModel();
	nodeList: Array<NodeModel>;
	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.ucService.getUc(+params["ucId"]))
			.switchMap((uc: UcModel) => {
				this.ucMode = uc;
				return this.nodeService.getNodes(uc.id);
			})
			.subscribe(nodeList => {
				this.nodeList = nodeList;
			});
	}

	showNode(node: NodeModel) {
		this.router.navigate(['/ucgroup', this.ucMode.groupId, 'nodes', node.id])
	}
}
