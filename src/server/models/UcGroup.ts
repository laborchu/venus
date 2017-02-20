'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  name: { type: String },
  projectId: { type: String },
  dataStatus: { type: Number }
});
const _model = mongoose.model<mongoose.Document>('groups', _schema);

class UcGroup extends BaseModel {
  constructor() {
    super()
  }
  static find(params:Object): Promise<Array<UcGroup>> {
    return new Promise<Array<UcGroup>>((resolve, reject) => {
      _model.find(params, (err: any, projects: Array<UcGroup>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }


  static insert(ucGroup: Object): Promise<UcGroup> {
    return new Promise<UcGroup>((resolve, reject) => {
      _model.insertMany([ucGroup], (err: any, ucGroups: Array<UcGroup>) => {
        err ? reject(err) : resolve(ucGroups[0])
      })
    });
  }

  static update(ucGroup:any): Promise<UcGroup> {
    return new Promise<UcGroup>((resolve, reject) => {
      _model.update({ _id: ucGroup._id }, ucGroup,{}, (err, rawResponse) => {
      err ? reject(err) : resolve(rawResponse)
      })
    });
  }

}

export { UcGroup }
