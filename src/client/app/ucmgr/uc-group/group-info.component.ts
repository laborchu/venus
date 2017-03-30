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
  projectId: string = "";
	ucGroup: UcGroupModel = new UcGroupModel();
	rightBtnConf:Object = {
    del: {
      click: () => {
        this.ucGroup.dataStatus = 0;
        this.ucGroupService.delUcGroups(this.ucGroup)
          .subscribe(() => {
            this.ucGroupService.setUpdateGroupSubject(this.ucGroup);
            this.router.navigate(["/projects", this.projectId]);
          });
      }
    },
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
    this.route.parent.parent.params.subscribe(params => {
      this.projectId = params["projectId"];
    });
		this.route.params
			.switchMap((params: Params) => this.ucGroupService.getUcGroup(params["groupId"]))
			.subscribe((ucGroups: Array<UcGroupModel>) => {
				this.ucGroup = ucGroups[0];
			});
	}
}
