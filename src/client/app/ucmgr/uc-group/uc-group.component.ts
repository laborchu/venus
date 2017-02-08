import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UcModel } from '../../models/index';
import { UcService } from '../../services/index';
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
	  private ucService: UcService
	) { }
	ucArray: Array<UcModel>;
	selectUc: UcModel;

	ngOnInit():void{
		this.route.params
			.switchMap((params: Params) => this.ucService.getUcs(+params["id"]))
			.subscribe((ucs: Array<UcModel>) => {
				this.ucArray = ucs;
				this.selectUc = ucs[0];
			});
	}

	showUc(uc: UcModel) {
		this.selectUc = uc;
		this.router.navigate(['/ucgroup', uc.groupId, 'uc', uc.id]);
	}
}
