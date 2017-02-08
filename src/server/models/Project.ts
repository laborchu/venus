'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  name: { type: String }
});
const _model = mongoose.model<mongoose.Document>('project', _schema);

class Project extends BaseModel {
  constructor() {
    super()
  }
  static find(): Promise<Array<Project>> {
    return new Promise<Array<Project>>((resolve, reject) => {
      _model.find({}, (err: any, projects: Array<Project>) => {
        err ? reject(err) : resolve(projects)
      })
    });
  }

  static insert(project: Project): Promise<Project> {
    return new Promise<Project>((resolve, reject) => {
      _model.insertMany([project], (err: any, projects: Array<Project>) => {
        err ? reject(err) : resolve(projects[0])
      })
    });
  }
}

export { Project }
