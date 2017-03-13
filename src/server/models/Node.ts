'use strict';
import BaseModel from "./BaseModel";
import { Uc } from "./Uc";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');
import { NodeModel } from './index';
const _schema = new mongoose.Schema({
  title: { type: String },
  sleep: { type: Number },
  dataStatus: { type: Number },
  order: { type: Number },
  ucId: { type: String }
});

_schema.plugin(autoIncrement.plugin, { model: 'ucs.nodes', field: 'order', startAt: 1 });
interface NodeDocument extends NodeModel, mongoose.Document {
  _id: string;
}

const _model = mongoose.model<NodeDocument>('ucs.nodes', _schema);

class Node extends BaseModel {
  constructor() {
    super()
  }
  static find(params: any): Promise<Array<NodeModel>> {
    params.dataStatus = 1;
    return new Promise<Array<NodeModel>>((resolve, reject) => {
      _model.find(params).sort({ order: 1 }).exec((err: any, projects: Array<NodeModel>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }

  static insert(node: any): Promise<NodeModel> {
    node._id = new mongoose.Types.ObjectId();
    return new Promise<NodeModel>((resolve, reject) => {
      _model.create(node, (err: any, result: NodeModel) => {
        err ? reject(err) : resolve(result)
      })
    });
  }

  static update(node: any): Promise<NodeModel> {
    return new Promise<NodeModel>((resolve, reject) => {
      _model.update({ _id: node._id }, node, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }


  static remove(params: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      _model.remove(params, (err) => {
        err ? reject(err) : resolve()
      })
    });
  }

  static delete(nodeId: string): Promise<NodeModel> {
    return new Promise<NodeModel>((resolve, reject) => {
      _model.update({ _id: nodeId }, { dataStatus: 0 }, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

}

export { Node }
