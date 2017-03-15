import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UcmgrComponent, ProjectComponent } from './index';
import { ProjectJsComponent } from './projectjs/projectjs.component';

import { UcGroupComponent, GroupInfoComponent } from './uc-group/index';
import { UcComponent } from './uc/index';
import { NodeComponent } from './node/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'projects',
        component: ProjectComponent, 
        children: [
          {
            path: ':projectId',
            component: UcmgrComponent,
            children: [
              {
                path: 'projectjs/:jsId',
                component: ProjectJsComponent
              },
              {
                path: 'ucgroups/:groupId',
                component: UcGroupComponent,
                children: [
                  {
                    path: '',
                    component: GroupInfoComponent
                  },
                  {
                    path: 'ucs/:ucId/nodes',
                    component: NodeComponent
                  },
                  {
                    path: 'ucs/:ucId',
                    component: UcComponent
                  },
                  {
                    path: 'nodes/:nodeId',
                    component: NodeComponent
                  }
                ]
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
