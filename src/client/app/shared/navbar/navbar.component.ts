import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';

import { UcService } from '../../services/index';
import { UcModel } from '../../models/index';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'mv-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements OnInit { 
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private ucService: UcService
	) { }
	groupId: string;

	public options = {
		position: ["bottom", "right"],
		timeOut: 3000
	}

	ngOnInit(): void {
		this.router.events.subscribe(val => {
			if (val instanceof RoutesRecognized) {
				if (val.state.root.firstChild) {
					this.groupId = val.state.root.firstChild.params["groupId"];
				}
			}
		});

	}

	popNewUcClick(): void {
		setTimeout(function(){
			let newUcInput = document.getElementById("newUcInput");
			if (newUcInput){
				newUcInput.focus();
			}
		},100);
	}

	addUc(value: string, newUcView:any): void {
		if (value){
			let uc: UcModel = new UcModel();
			uc.title = value;
			uc.groupId = this.groupId;
			uc.build = true;
			uc.filter = true;
			uc.dataStatus = 1;
			this.route.params
				.switchMap((params: Params) => this.ucService.addUc(uc))
				.subscribe((result:UcModel) => {
					this.ucService.setUcChangeSubject(result);
					this.router.navigate(['/ucgroups', uc.groupId, 'ucs', result._id]);
				});
			newUcView.close();
		}
	}
}
