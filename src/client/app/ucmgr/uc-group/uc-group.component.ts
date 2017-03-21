import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { DragulaService } from 'ng2-dragula';

import { UcModel, UcGroupModel } from '../../models/index';
import { UcService, UcGroupService } from '../../services/index';
import 'rxjs/add/operator/switchMap';
/**
 * This class represents the navigation bar component.
 */
@Component({
	moduleId: module.id,
	selector: 'mv-uc-group',
	templateUrl: 'uc-group.component.html',
	styleUrls: ['uc-group.component.css'],
})
export class UcGroupComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private ucService: UcService,
		private ucGroupService: UcGroupService,
		private dragulaService: DragulaService
	) { }
	public ucArray: Array<UcModel> = [];

	selectUc: UcModel;
  groupInfoHeight: number = window.innerHeight - 90;
	projectId: string;
	ngOnInit(): void {
		this.refresh();
		this.ucService.getUcChangeSubject().subscribe((uc: UcModel) => {
			this.refresh();
		});

		this.dragulaService.dropModel.subscribe((value: any) => {
			if(value[0]=="uc-list"){
				this.onDrop(value.slice(1));
			}
		});
	}

  onResize(event: any) {
    this.groupInfoHeight = event.target.innerHeight - 90;
  }

	refresh() {
		let ucId: string;
		this.route.firstChild.params.subscribe((params: Params) => {
			ucId = params["ucId"];
		})
		this.route.parent.params.subscribe((params: Params) => {
			this.projectId = params["projectId"];
		})
		this.route.params
			.switchMap((params: Params) => {
				let updateGroup: UcGroupModel = new UcGroupModel();
				updateGroup._id = params["groupId"];
				this.ucGroupService.setSelectGroupSubject(updateGroup);
				return this.ucService.getUcs(params["groupId"]);
			})
			.subscribe((ucs: Array<UcModel>) => {
				this.ucArray = ucs;
				if (ucId) {
					this.ucArray.every((e: UcModel) => {
						if (e._id == ucId) {
							this.selectUc = e;
							return false;
						}
						return true;
					})
				} else {
					this.selectUc = null;
				}
				ucId = null;
			});
	}

	showUc(uc: UcModel) {
		this.selectUc = uc;
		this.router.navigate(['/projects', this.projectId, 'ucgroups', uc.groupId, 'ucs', uc._id]);
	}

	onDrop(args: any) {
		let [el, parents] = args;
		let dragTo = [].slice.call(el.parentElement.children).indexOf(el);

		let preOrder = 0;
		let nextOrder = 0;
		let curOrder = 0;
		if(dragTo!=0){
			let preUc:UcModel = this.ucArray[dragTo - 1];
			preOrder = preUc.order;
		}
		if(dragTo!=(this.ucArray.length-1)){
			let nextUc: UcModel = this.ucArray[dragTo + 1];
			nextOrder = nextUc.order;
		}else{
			curOrder = +(preOrder + 0.01).toFixed(0);
		}
		if (curOrder==0){
			curOrder = (preOrder + nextOrder) / 2;
		}
		this.ucArray[dragTo].order = curOrder;
		this.ucService.updateUc(this.ucArray[dragTo]).subscribe(() => { });
	}
}
