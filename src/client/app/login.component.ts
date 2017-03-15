import { Component } from '@angular/core';
import { Router } from '@angular/router';
import './operators';
import { UserModel } from './models/index';
import { SessionService } from './services/index';

import { Md5 } from "ts-md5/dist/md5";

/**
 * This class represents the main application component.
 */
@Component({
	moduleId: module.id,
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css'],
})
export class LoginComponent {
	constructor(
		private router: Router,
		private sessionService: SessionService) {}

  uname: string ="";
  pwd: string = "";

  login(){
	  let user: UserModel = new UserModel();
	  user.username = this.uname;
	  user.password = Md5.hashStr(this.pwd).toString();
	  this.sessionService.postSession(user).subscribe((result)=>{
		  if(result){
			  this.router.navigate(['/projects']);
		  }
	  })
  }
}
