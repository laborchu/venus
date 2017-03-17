import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent, LoginComponent, NotFoundComponent } from './index';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundRoutingModule } from './not-found-routing.module';

import { SharedModule } from './shared/shared.module';
import { UcMgrModule } from './ucmgr/ucmgr.module';

import {
  ProjectService, ProjectJsService, UcGroupService,
  UcService, NodeService, PathService, SessionService,UserService
} from './services/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    UcMgrModule,
    NotFoundRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [AppComponent, LoginComponent, NotFoundComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    ProjectService, UcGroupService, UcService, NodeService,
    PathService, ProjectJsService, SessionService,UserService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
