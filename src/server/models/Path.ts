'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { PathModel } from './index';

const _schema = new mongoose.Schema({
	title: { type: String },
	projectId: { type: String },
	ucId: { type: String },
	nodeId: { type: String },
	sleep: { type: Number },
	canNull: { type: Boolean },
	cacheElement: { type: Boolean },
	cacheDesc: { type: Boolean },
	type: { type: String },
	selector: { type: String },
	element: { type: String },
	inThen: { type: Boolean },
	index: { type: Number },
	mode: { type: String },
	filter: { type: Object },
	limit: { type: Number },
	value: { type: String },
	cmdCode: { type: String },
	subType: { type: String },
	target: { type: String },
	fromX: { type: Number },
	fromY: { type: Number },
	toX: { type: Number },
	toY: { type: Number },
	order: { type: Number },
	dataStatus: { type: Number },
	createdBy: { type: String },
	createdDate: { type: Date },
	modifiedBy: { type: String },
	modifiedDate: { type: Date }
});
_schema.plugin(autoIncrement.plugin, { model: 'ucs.paths', field: 'order', startAt: 1 });
interface PathDocument extends PathModel, mongoose.Document {
	_id: string;
}

const _model = mongoose.model<PathDocument>('ucs.paths', _schema);

class Path extends BaseModel {
	constructor() {
		super()
	}

	static find(params: any): Promise<Array<PathModel>> {
		params.dataStatus = 1;
		return new Promise<Array<PathModel>>((resolve, reject) => {
			_model.find(params).sort({ order: 1 }).exec((err: any, projects: Array<PathModel>) => {
				err ? reject(err) : resolve(projects)
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
	

	static insert(path: any): Promise<PathModel> {
		path._id = new mongoose.Types.ObjectId();
		return new Promise<PathModel>((resolve, reject) => {
			_model.create(path, (err: any, result: PathModel) => {
				err ? reject(err) : resolve(result)
			})
		});
	}

	static updatePath(path: PathModel): Promise<PathModel> {
		return new Promise<PathModel>((resolve, reject) => {
			_model.update({ _id: path._id }, path, {}, (err, rawResponse) => {
				err ? reject(err) : resolve(rawResponse)
			})
		});
	}
}

export { Path }
