import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UcGroupModel } from '../../models/index';
import { UcGroupService } from '../../services/index';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'group-info.component.html',
  styleUrls: ['group-info.component.css'],
})
export class GroupInfoComponent implements OnInit{ 
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private ucGroupService: UcGroupService
	){}

	ucGroup: UcGroupModel = new UcGroupModel();
	rightBtnConf:Object = {
		save:{
			click:()=>{
				let updateGroup: UcGroupModel = new UcGroupModel();
				updateGroup._id = this.ucGroup._id;
				updateGroup.name = this.ucGroup.name;
				this.ucGroupService.updateUcGroups(updateGroup)
					.subscribe(() => {
						this.ucGroupService.setUpdateGroupSubject(this.ucGroup);
				});
			}
		}
	};
	ngOnInit(){
		this.route.params
			.switchMap((params: Params) => this.ucGroupService.getUcGroup(params["groupId"]))
			.subscribe((ucGroups: Array<UcGroupModel>) => {
				this.ucGroup = ucGroups[0];
			});
	}
}
