import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UcmgrComponent } from './ucmgr.component';

import { UcGroupComponent,GroupInfoComponent } from './uc-group/index';
import { UcComponent } from './uc/index';
import { NodeComponent } from './node/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      { 
      	path: 'ucgroup', 
      	component: UcmgrComponent ,
      	children:[
      		{
      			path:':id',
      			component:UcGroupComponent,
      			children:[
      				{
      					path:'',
      					component:GroupInfoComponent
      				},
              {
                path:'uc/:ucId',
                component:UcComponent
              },
              {
                path:'nodes/:nodeId',
                component:NodeComponent
              }
      			]
      		}
      	]
      }
    ])
  ],
  exports: [RouterModule]
})
export class UcMgrRoutingModule { }
