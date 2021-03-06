import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'mv-code-form-content',
  styleUrls: ['mv-nav.component.css'],
  templateUrl: 'code-form.component.html'
})
export class MvCodeJsFormContent {
  @Input() code: string;
  constructor(public activeModal: NgbActiveModal) { }

}
