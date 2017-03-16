'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { UserModel } from './index';

const _schema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  dataStatus: { type: Number },
  createdBy: { type: String },
  createdDate: { type: Date },
  modifiedBy: { type: String },
  modifiedDate: { type: Date }
});

_schema.plugin(autoIncrement.plugin, { model: 'users', field: 'order', startAt: 1 });
interface UcDocument extends UserModel, mongoose.Document {
  _id: string;
}

const _model = mongoose.model<UcDocument>('users', _schema);

class User extends BaseModel {
  constructor() {
    super()
  }

  static find(params: any): Promise<Array<UserModel>> {
    params.dataStatus = 1;
    return new Promise<Array<UserModel>>((resolve, reject) => {
      _model.find(params, (err: any, ucs: Array<UserModel>) => {
        err ? reject(err) : resolve(ucs);
      })
    });
  }

  static insert(uc: UserModel): Promise<UserModel> {
    return new Promise<UserModel>((resolve, reject) => {
      _model.insertMany([uc], (err: any, ucGroups: Array<UserModel>) => {
        err ? reject(err) : resolve(ucGroups[0])
      })
    });
  }

  static update(uc: UserModel): Promise<UserModel> {
    uc.modifiedDate = new Date();
    return new Promise<UserModel>((resolve, reject) => {
      _model.update({ _id: uc._id }, uc, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

  static delete(ucId: string, modifiedBy: string): Promise<UserModel> {
    return new Promise<UserModel>((resolve, reject) => {
      _model.findOneAndUpdate({ _id: ucId },
        { dataStatus: 0, modifiedBy: modifiedBy, modifiedDate: new Date() },
        (err, rawResponse) => {
          err ? reject(err) : resolve(rawResponse)
        });
    });
  }

}

export { User }
