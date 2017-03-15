import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent, NotFoundComponent,AppComponent } from './index';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'login', component: LoginComponent },
      { path: '404', component: NotFoundComponent }
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

