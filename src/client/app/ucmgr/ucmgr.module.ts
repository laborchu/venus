import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { UcmgrComponent,ProjectComponent } from './index';
import { ProjectJsComponent } from './projectjs/projectjs.component';
import { UcGroupComponent, GroupInfoComponent } from './uc-group/index';
import { UcComponent } from './uc/index';
import { NodeComponent } from './node/index';
import { PathComponent } from './path/index';

import { UcMgrRoutingModule } from './ucmgr-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


@NgModule({
	imports: [FormsModule,
		ConfirmationPopoverModule.forRoot({
			confirmButtonType: 'danger',
			cancelText: '取消',
			confirmText: '确认'
		}),
		 CustomFormsModule, CommonModule, UcMgrRoutingModule, SharedModule],
	declarations: [UcGroupComponent, UcmgrComponent, ProjectComponent, ProjectJsComponent, PathComponent,
					GroupInfoComponent, UcComponent, NodeComponent],
	exports: [],
	providers: [],
  entryComponents: [PathComponent]
})
export class UcMgrModule { }
