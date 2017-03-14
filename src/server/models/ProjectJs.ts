'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { ProjectJsModel } from './index';

const _schema = new mongoose.Schema({
  projectId: { type: String },
  name: { type: String },
  fixed: { type: Boolean },
  jsName: { type: String },
  script: { type: String },
  requires: { type: Array },
  order: { type: Number },
  dataStatus: { type: Number }
});

_schema.plugin(autoIncrement.plugin, { model: 'projects.js', field: 'order', startAt: 1 });
interface ProjectJsDocument extends ProjectJsModel, mongoose.Document {
  _id: string;
}

const _model = mongoose.model<ProjectJsDocument>('projects.js', _schema);

class ProjectJs extends BaseModel {
  constructor() {
    super()
  }
  static find(params: any, projection?: Object): Promise<Array<ProjectJsModel>> {
    params.dataStatus = 1;
    return new Promise<Array<ProjectJsModel>>((resolve, reject) => {
      _model.find(params, projection, (err: any, projects: Array<ProjectJsModel>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }

  static insert(js: ProjectJsModel): Promise<ProjectJsModel> {
    return new Promise<ProjectJsModel>((resolve, reject) => {
      _model.create(js, (err: any, result: ProjectJsModel) => {
        err ? reject(err) : resolve(result)
      })
    });
  }

  static update(js: any): Promise<ProjectJsModel> {
    return new Promise<ProjectJsModel>((resolve, reject) => {
      _model.update({ _id: js._id }, js, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }

  static delete(jsId: string): Promise<any> {
    return new Promise<ProjectJsModel>((resolve, reject) => {
      _model.findOneAndUpdate({ _id: jsId }, { dataStatus: 0 }, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      });
    });
  }

}

export { ProjectJs }
