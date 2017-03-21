'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');
import { UcGroupModel } from './index';

const _schema = new mongoose.Schema({
  name: { type: String },
  projectId: { type: String },
  order: { type: Number },
  dataStatus: { type: Number },
  createdBy: { type: String },
  createdDate: { type: Date },
  modifiedBy: { type: String },
  modifiedDate: { type: Date }
});

_schema.plugin(autoIncrement.plugin, { model: 'ucGroup', field: 'order', startAt: 1 });
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
      _model.find(params).sort({ order: 1 }).exec((err: any, ucs: Array<UcGroupModel>) => {
        err ? reject(err) : resolve(ucs)
      })
    });
  }


  static insert(ucGroup: UcGroupModel): Promise<UcGroupModel> {
    return new Promise<UcGroupModel>((resolve, reject) => {
      _model.create(ucGroup, (err: any, result: UcGroupModel) => {
        err ? reject(err) : resolve(result)
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
