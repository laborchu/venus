'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { ProjectModel } from './index';

const _schema = new mongoose.Schema({
   name: { type: String },
   platform: { type: String },
   package: { type: String },
   activity: { type: String },
   udid: { type: String },
   platformVersion: { type: String },
   bundleId: { type: String },
   deviceName: { type: String },
   order: { type: Number },
   dataStatus: { type: Number },
   createdBy: { type: String },
   createdDate: { type: Date },
   modifiedBy: { type: String },
   modifiedDate: { type: Date }
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

   static insert(project: any, createBy: string): Promise<ProjectModel> {
      project._id = new mongoose.Types.ObjectId();
      project.createdBy = createBy;
      project.createdDate = new Date();
      project.modifiedBy = createBy;
      project.modifiedDate = new Date();
      return new Promise<ProjectModel>((resolve, reject) => {
         _model.create(project, (err: any, result: ProjectModel) => {
            err ? reject(err) : resolve(result)
         })
      });
   }

   static update(project: ProjectModel, modifiedBy: string): Promise<ProjectModel> {
      project.modifiedBy = modifiedBy;
      project.modifiedDate = new Date();
      return new Promise<ProjectModel>((resolve, reject) => {
         _model.update({ _id: project._id }, project, {}, (err, rawResponse) => {
            err ? reject(err) : resolve(rawResponse)
         })
      });
   }

}

export { Project }
