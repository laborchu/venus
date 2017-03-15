import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '**', redirectTo: '/404' }
    ])
  ],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }

