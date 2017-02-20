'use strict';
import BaseModel from "./BaseModel";
import { Uc } from "./Uc";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  title: { type: String },
  sleep: { type: Number },
  dataStatus: { type: Number },
  ucId: { type: mongoose.Schema.Types.ObjectId, ref: 'ucs' }
});
const _model = mongoose.model<mongoose.Document>('nodes', _schema);

class Node extends BaseModel {
  constructor() {
    super()
  }
  static find(params:any): Promise<Array<Node>> {
    return new Promise<Array<Node>>((resolve, reject) => {
      _model.find(params, (err: any, projects: Array<Node>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }

  static insert(node: any): Promise<Node> {
    return new Promise<Node>((resolve, reject) => {
      _model.insertMany([node], (err: any, nodes: Array<any>) => {
        Uc.find({ _id: node.ucId }).then((ucs:any)=>{
          let ucModel = ucs[0];
          let nodeModel = nodes[0];
          ucModel.nodes.push(nodeModel._id);
          Uc.update(ucModel);
          err ? reject(err) : resolve(nodeModel)
        });
      })
    });
  }

  static update(node: any): Promise<Node> {
    return new Promise<Node>((resolve, reject) => {
      _model.update({ _id: node._id }, node, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }


  static delete(nodeId: string): Promise<Node> {
    return new Promise<Node>((resolve, reject) => {
      _model.update({ _id: nodeId }, {dataStatus:0}, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

}

export { Node }
