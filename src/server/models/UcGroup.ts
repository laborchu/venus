'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  name: { type: String },
  projectId: { type: String }
});
const _model = mongoose.model<mongoose.Document>('uc.group', _schema);

class UcGroup extends BaseModel {
  constructor() {
    super()
  }
  static find(projectId:string): Promise<Array<UcGroup>> {
    return new Promise<Array<UcGroup>>((resolve, reject) => {
      _model.find({ "projectId": projectId }, (err: any, projects: Array<UcGroup>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }
}

export { UcGroup }
