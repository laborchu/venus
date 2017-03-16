import { Component } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'mv-code-form-content',
  templateUrl: 'code-form.component.html'
})
export class MvCodeJsFormContent {
  constructor(public activeModal: NgbActiveModal) { }
}
