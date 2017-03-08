'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  projectId: { type: String },
  jsCode: { type: String },
  script: { type: String },
  dataStatus: { type: Number }
});
const _model = mongoose.model<mongoose.Document>('projects.js', _schema);

class ProjectJs extends BaseModel {
  constructor() {
    super()
  }
  static find(params: any, projection?:Object): Promise<Array<ProjectJs>> {
    return new Promise<Array<ProjectJs>>((resolve, reject) => {
      _model.find(params, projection, (err: any, projects: Array<ProjectJs>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }

  static insert(js: ProjectJs): Promise<ProjectJs> {
    return new Promise<ProjectJs>((resolve, reject) => {
      _model.insertMany([js], (err: any, projects: Array<ProjectJs>) => {
        err ? reject(err) : resolve(projects[0])
      })
    });
  }

  static updateScript(js: any): Promise<ProjectJs> {
    return new Promise<ProjectJs>((resolve, reject) => {
      _model.update({ _id: js._id }, js, {}, (err, rawResponse) => {
        err ? reject(err) : resolve(rawResponse)
      })
    });
  }
  
}

export { ProjectJs }
