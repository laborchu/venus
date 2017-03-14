import { Component, Input } from '@angular/core';
import { ProjectJsModel } from '../../models/index';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	moduleId: module.id,
	selector: 'mv-projectjs-form-content',
	templateUrl: 'projectjs-form.component.html'
})
export class MvProjectJsFormContent {
	@Input() model: ProjectJsModel;

	constructor(public activeModal: NgbActiveModal) { }
}
