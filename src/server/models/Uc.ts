'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  title: { type: String },
  groupId: { type: String },
  ucKey: { type: String },
  sleep: { type: Number },
  build: { type: Boolean },
  handler: { type: Boolean },
  filter: { type: Boolean },
  only: { type: Boolean },
  dataStatus: { type: Number },
  nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'nodes' }]
});
const _model = mongoose.model<mongoose.Document>('ucs', _schema);

class Uc extends BaseModel {
  constructor() {
    super()
  }

  static find(params: any): Promise<Array<Uc>> {
    params.dataStatus = 1;
    return new Promise<Array<Uc>>((resolve, reject) => {
      _model.find(params).populate({ path: "nodes",match:{dataStatus:1} }).exec((err: any, projects: Array<Uc>) => {
        err ? reject(err) : resolve(projects)
      });
      // _model.find(params, (err: any, projects: Array<Uc>) => {
      //   err ? reject(err) : resolve(projects)
      // })
    });
  }


  static insert(uc: Uc): Promise<Uc> {
    return new Promise<Uc>((resolve, reject) => {
      _model.insertMany([uc], (err: any, ucGroups: Array<Uc>) => {
        err ? reject(err) : resolve(ucGroups[0])
      })
    });
  }

  static update(uc: any): Promise<Uc> {
    return new Promise<Uc>((resolve, reject) => {
      _model.update({ _id: uc._id }, uc, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

  static delete(ucId: string): Promise<Uc> {
    return new Promise<Uc>((resolve, reject) => {
      _model.findOneAndUpdate({ _id: ucId }, { dataStatus: 0 }, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      });
    });
  }

}

export { Uc }
