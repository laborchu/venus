import { Component,Input,ViewChild,Output} from '@angular/core';

import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PathModel, PathHelper, CheckHelper, CheckerModel } from '../../models/index'
import { PathService, } from '../../services/index';
import { NgForm } from '@angular/forms';

@Component({
  moduleId: module.id,
  styleUrls: ['path.component.css'],
  selector: 'mv-path-content',
  templateUrl: 'path.component.html'
})
export class PathComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private pathService: PathService
  ) {}
  @Input() pathModel: PathModel;
  checkerModel: CheckerModel =  new CheckerModel();

  @ViewChild('form') public form: NgForm;

  pathTitle: string = "新增path";
  checkTitle: string = "验证";

  pathFieldSet: Set<String> = new Set();
  checkFieldSet: Set<String> = new Set();
  pathTypes: Array<String> = PathHelper.getTypes();
  selectors: Array<String> = PathHelper.getSelector();
  checks: Array<String> = CheckHelper.getTypes();
  groupId: string = "";
  projectId: string = "";
  ucId: string = "";
  nodeId: string = "";
  checkIndex: number;

  ngOnInit() {
    if(this.pathModel){
      this.typeChange(this.pathModel.type);
      this.pathService.getChecker(this.pathModel)
        .subscribe((checkers: Array<CheckerModel>) => {
          this.pathModel.checker = checkers
        });
    }
  }

  typeChange(type: string) {
     [this.pathModel, this.pathFieldSet] = PathHelper.buildModel(type, this.pathModel);
  }

  checkChange(type: string) {
    [this.checkerModel, this.checkFieldSet] = CheckHelper.buildModel(type, this.checkerModel);
  }
  openChecker(checker: CheckerModel, index: number) {
    this.checkerModel = checker;
    this.checkIndex = index;
    this.checkChange(checker.type);
  }
  delChecker(index: number) {
    this.pathModel.checker.splice(index, 1);
  }
}
