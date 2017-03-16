'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { UcModel, Node } from './index';

const _schema = new mongoose.Schema({
  title: { type: String },
  projectId: { type: String },
  groupId: { type: String },
  ucKey: { type: String },
  sleep: { type: Number },
  build: { type: Boolean },
  handler: { type: Boolean },
  filter: { type: Boolean },
  only: { type: Boolean },
  code: { type: String },
  order: { type: Number },
  dataStatus: { type: Number },
  createdBy: { type: String },
  createdDate: { type: Date },
  modifiedBy: { type: String },
  modifiedDate: { type: Date }
});

_schema.plugin(autoIncrement.plugin, { model: 'ucs', field: 'order', startAt: 1 });
interface UcDocument extends UcModel, mongoose.Document {
  _id: string;
}

const _model = mongoose.model<UcDocument>('ucs', _schema);

class Uc extends BaseModel {
  constructor() {
    super()
  }

  static find(params: any): Promise<Array<UcModel>> {
    params.dataStatus = 1;
    return new Promise<Array<UcModel>>((resolve, reject) => {
      _model.find(params).sort({ order: 1 }).exec((err: any, ucs: Array<UcModel>) => {
        err ? reject(err) : resolve(ucs)
      })
    });
  }

  static insert(uc: UcModel): Promise<UcModel> {
    return new Promise<UcModel>((resolve, reject) => {
      _model.create(uc, (err: any, result: UcModel) => {
        err ? reject(err) : resolve(result)
      })
    });
  }

  static update(uc: UcModel): Promise<UcModel> {
    return new Promise<UcModel>((resolve, reject) => {
      _model.update({ _id: uc._id }, uc, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

  static delete(ucId: string, modifiedBy: string): Promise<UcModel> {
    return new Promise<UcModel>((resolve, reject) => {
      _model.findOneAndUpdate({ _id: ucId },
        { dataStatus: 0, modifiedBy: modifiedBy, modifiedDate: new Date() },
        (err, rawResponse) => {
          err ? reject(err) : resolve(rawResponse)
        });
    });
  }

}

export { Uc }
