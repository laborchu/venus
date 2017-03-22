import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '../operators';
import { UserModel } from '../models/index';
import { UserService } from '../services/index';

import { Md5 } from "ts-md5/dist/md5";

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['login.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService) {}

  uname: string ="";
  pwd: string = "";
  repwd: string = "";
  ngOnInit() {
  }
  login() {
    this.router.navigate(['/login']);
  }
  register(){
    let user: UserModel = new UserModel();
    if(this.pwd==this.repwd){
      user.username = this.uname;
      user.password = Md5.hashStr(this.pwd).toString();
      this.userService.addUser(user).subscribe((user: UserModel)=>{
        this.router.navigate(['/login']);
      })
    }
  }
}
