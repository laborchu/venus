import {Component,Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	moduleId:module.id,
	selector:'mv-nav',
	templateUrl:'mv-nav.component.html',
	styleUrls:['mv-nav.component.css']
})
export class MvNavComponent{
	constructor(
		private router:Router
	){}
	@Input() title:string;
	@Input() navigate: Array<any>;
	@Input() formObj: any;
	@Input() rightBtnConf: Object;
	@Input() topBottom: boolean = false;
	canBack(){
		return this.navigate!=null;
	}
	back(){
		if(this.canBack()){
			this.router.navigate(this.navigate);
		}
	}
}
