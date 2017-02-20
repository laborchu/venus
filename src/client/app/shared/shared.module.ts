import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { MenuComponent } from './menu/index';
import { NavbarComponent } from './navbar/index';
import { MvNavComponent } from './mv-nav/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule, NgbModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      cancelText: '取消',
      confirmText: '确认'
    })],
  declarations: [MenuComponent, NavbarComponent,MvNavComponent],
  exports: [MenuComponent, NavbarComponent,MvNavComponent,
    CommonModule, FormsModule, RouterModule,NgbModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
