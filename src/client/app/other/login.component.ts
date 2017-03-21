import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '../operators';
import { UserModel,UserHelper } from '../models/index';
import { SessionService } from '../services/index';

import { Md5 } from "ts-md5/dist/md5";

/**
 * This class represents the main application component.
 */
@Component({
	moduleId: module.id,
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(
		private router: Router,
		private sessionService: SessionService
  ) {}

  uname: string ="";
  pwd: string = "";

  ngOnInit() {
	  this.sessionService.getSession().subscribe((user: UserModel) => {
		  if (user._id) {
			  this.router.navigate(['/projects']);
		  }
	  })
  }

  login(){
	  let user: UserModel = new UserModel();
	  user.username = this.uname;
	  user.password = Md5.hashStr(this.pwd).toString();
	  this.sessionService.postSession(user).subscribe((users: Array<UserModel>)=>{

		  if(user){
		  	  this.router.navigate(['/projects']);
		  	  this.sessionService.setSessionChangeSubject(users[0]);
		  }
	  })
  }
}
