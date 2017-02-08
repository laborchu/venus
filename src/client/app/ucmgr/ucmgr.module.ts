import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UcmgrComponent } from './ucmgr.component';
import { UcGroupComponent, GroupInfoComponent } from './uc-group/index';
import { UcComponent } from './uc/index';
import { NodeComponent } from './node/index';

import { UcMgrRoutingModule } from './ucmgr-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [FormsModule, CommonModule, UcMgrRoutingModule, SharedModule],
	declarations: [UcGroupComponent, UcmgrComponent, GroupInfoComponent, UcComponent, NodeComponent],
	exports: [],
	providers: []
})
export class UcMgrModule { }
