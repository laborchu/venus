import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { UcMgrModule } from './ucmgr/ucmgr.module';

import { ProjectService, UcGroupService, UcService, NodeService, PathService } from './services/index';
// import { InMemoryDataService }  from './services/in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule, 
    AppRoutingModule, 
  	SharedModule.forRoot(),
    UcMgrModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
  declarations: [AppComponent],
  providers: [
	  {
	    provide: APP_BASE_HREF,
	    useValue: '<%= APP_BASE %>'
	  },
    ProjectService, UcGroupService, UcService, NodeService, PathService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
