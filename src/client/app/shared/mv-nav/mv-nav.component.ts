import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId:module.id,
	selector:'mv-nav',
	templateUrl:'mv-nav.component.html',
	styleUrls:['mv-nav.component.css']
})
export class MvNavComponent{
	constructor(
		private router: Router,
	){}
	@Input() title:string;
	@Input() navigate: Array<any>;
	@Input() formObj: any;
	@Input() rightBtnConf: any;
	@Input() topBottom: boolean = false;
	@Input() marginMenu: boolean = false;
	@Input() code: string = "";

	@ViewChild('editor') editor:any;
	canBack(){
		return this.navigate!=null;
	}
	back(){
		if(this.canBack()){
			this.router.navigate(this.navigate);
		}
	}
	// onChange(code:string) {
	// 	this.code = code;
	// }
	// codeClick(content:any) {
	// 	this.modalService.open(MvCodeJsFormContent, { backdrop: "static" }).result.then(() => {
	// 		this.rightBtnConf.code.finish(this.code);
	// 	}, () => {
	// 	});
	// }
}
