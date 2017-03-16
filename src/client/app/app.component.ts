import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import './operators';

import { UserModel } from './models/index';
import { SessionService } from './services/index';
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'mv-app',
  template: `
  	<div class="loading-wrapper" *ngIf="!hasLoading">
      <div class="loading"></div>
      <div>加载中...</div>
    </div>
    <simple-notifications [options]="options" ></simple-notifications>
    <ng2-slim-loading-bar></ng2-slim-loading-bar>
  	<router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  public options = {
    position: ["bottom", "right"],
    timeOut: 3000
  }
  hasLoading: boolean = false;
  ngOnInit() {
    this.sessionService.getSession().subscribe((user: UserModel) => {
      this.hasLoading = true;
      if (!user._id) {
        this.router.navigate(['/login']);
      } else {
        this.sessionService.setSessionChangeSubject(user);
        if (this.router.url == "/") {
          this.router.navigate(['/projects']);
        }
      }
    })
  }
}
