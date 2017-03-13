import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';

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
export class UcGroupComponent implements OnInit{ 
	constructor(
	  private router: Router,
	  private route: ActivatedRoute,
	  private ucService: UcService,
	  private ucGroupService: UcGroupService
	) { }
	ucArray: Array<UcModel>;
	selectUc: UcModel;
	ngOnInit():void{
		this.refresh();
		this.ucService.getUcChangeSubject().subscribe((uc: UcModel) => {
			this.refresh();
		});
	}

	refresh() {
		let ucId: string;
		this.route.firstChild.params.subscribe((params: Params) => {
			ucId = params["ucId"];
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
				if (ucId){
					this.ucArray.every((e: UcModel)=>{
						if(e._id==ucId){
							this.selectUc = e;
							return false;
						}
						return true;
					})
				}else{
					this.selectUc = null;
				}
				ucId = null;
			});
	}

	showUc(uc: UcModel) {
		this.selectUc = uc;
		this.router.navigate(['/ucgroups', uc.groupId, 'ucs', uc._id]);
	}
}
