import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * This class represents the main application component.
 */
@Component({
	moduleId: module.id,
	template: `
		<div class="loading-wrapper" *ngIf="!hasLoading">
	      <div class="loading"></div>
	      <div class="class-404">404 Not Found</div>
	      <div class="404-jumpt">3秒后跳转...</div>

	    </div>
	`
})
export class NotFoundComponent implements OnInit {
	constructor(
		private router: Router) { }
	ngOnInit() {
		setTimeout(() => {
			this.router.navigate(['/login']);
		}, 3000);
	}
}
