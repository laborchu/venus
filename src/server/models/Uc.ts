'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { UcModel,Node } from './index';

const _schema = new mongoose.Schema({
  title: { type: String },
  groupId: { type: String },
  ucKey: { type: String },
  sleep: { type: Number },
  build: { type: Boolean },
  handler: { type: Boolean },
  filter: { type: Boolean },
  only: { type: Boolean },
  code: { type: String },
  order: { type: Number },
  dataStatus: { type: Number }
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
      _model.find(params, (err: any, ucs: Array<UcModel>) => {
        err ? reject(err) : resolve(ucs);
      })
    });
  }

  static insert(uc: UcModel): Promise<UcModel> {
    return new Promise<UcModel>((resolve, reject) => {
      _model.insertMany([uc], (err: any, ucGroups: Array<UcModel>) => {
        err ? reject(err) : resolve(ucGroups[0])
      })
    });
  }

  static update(uc: any): Promise<UcModel> {
    return new Promise<UcModel>((resolve, reject) => {
      _model.update({ _id: uc._id }, uc, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

  static delete(ucId: string): Promise<UcModel> {
    return new Promise<UcModel>((resolve, reject) => {
      _model.findOneAndUpdate({ _id: ucId }, { dataStatus: 0 }, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      });
    });
  }

}

export { Uc }
