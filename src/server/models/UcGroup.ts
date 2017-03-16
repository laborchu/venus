'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

import { UcGroupModel } from './index';

const _schema = new mongoose.Schema({
  name: { type: String },
  projectId: { type: String },
  dataStatus: { type: Number },
  createdBy: { type: String },
  createdDate: { type: Date },
  modifiedBy: { type: String },
  modifiedDate: { type: Date }
});

interface UcGroupDocument extends UcGroupModel, mongoose.Document {
  _id: string;
}

const _model = mongoose.model<UcGroupDocument>('ucs.groups', _schema);

class UcGroup extends BaseModel {
  constructor() {
    super()
  }
  static find(params: Object): Promise<Array<UcGroupModel>> {
    return new Promise<Array<UcGroupModel>>((resolve, reject) => {
      _model.find(params, (err: any, projects: Array<UcGroupModel>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }


  static insert(ucGroup: UcGroupModel): Promise<UcGroupModel> {
    return new Promise<UcGroupModel>((resolve, reject) => {
      _model.insertMany([ucGroup], (err: any, ucGroups: Array<UcGroupModel>) => {
        err ? reject(err) : resolve(ucGroups[0])
      })
    });
  }

  static update(ucGroup: UcGroupModel): Promise<UcGroupModel> {
    return new Promise<UcGroupModel>((resolve, reject) => {
      _model.update({ _id: ucGroup._id }, ucGroup, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

}

export { UcGroup }
