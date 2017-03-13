'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { ProjectModel } from './index';

const _schema = new mongoose.Schema({
  name: { type: String },
  order: { type: Number },
  dataStatus: { type: Number }
});

_schema.plugin(autoIncrement.plugin, { model: 'project', field: 'order', startAt: 1 });
interface ProjectDocument extends ProjectModel, mongoose.Document {
  _id: string;
}

const _model = mongoose.model<ProjectDocument>('project', _schema);

class Project extends BaseModel {
  constructor() {
    super()
  }
  static find(params: any): Promise<Array<ProjectModel>> {
    return new Promise<Array<ProjectModel>>((resolve, reject) => {
      _model.find(params, (err: any, projects: Array<ProjectModel>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }

  static insert(project: ProjectModel): Promise<ProjectModel> {
    return new Promise<ProjectModel>((resolve, reject) => {
      _model.insertMany([project], (err: any, projects: Array<ProjectModel>) => {
        err ? reject(err) : resolve(projects[0])
      })
    });
  }
}

export { Project }
