'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');
import autoIncrement = require('mongoose-auto-increment');

import { CheckerModel } from './index';

const _schema = new mongoose.Schema({
	projectId: { type: String },
	ucId: { type: String },
	nodeId: { type: String },
	pathId: { type: String },
	title: { type: String },
	type: { type: String },
	selector: { type: String },
	element: { type: String },
	value: { type: String },
	key: { type: String },
	op: { type: String },
	cmdCode: { type: String },
	eexist: { type: String },
	paths: { type: String },
	order: { type: Number },
	dataStatus: { type: Number },
	createdBy: { type: String },
	createdDate: { type: Date },
	modifiedBy: { type: String },
	modifiedDate: { type: Date }
});
_schema.plugin(autoIncrement.plugin, { model: 'ucs.checkers', field: 'order', startAt: 1 });
interface CheckerDocument extends CheckerModel, mongoose.Document {
	_id: string;
}

const _model = mongoose.model<CheckerDocument>('ucs.checkers', _schema);

class Checker extends BaseModel {
	constructor() {
		super()
	}

	static find(params: any): Promise<Array<CheckerModel>> {
		params.dataStatus = 1;
		return new Promise<Array<CheckerModel>>((resolve, reject) => {
			_model.find(params).sort({ order: 1 }).exec((err: any, array: Array<CheckerModel>) => {
				err ? reject(err) : resolve(array)
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

	static insert(checker: any): Promise<CheckerModel> {
		checker._id = new mongoose.Types.ObjectId();
		return new Promise<CheckerModel>((resolve, reject) => {
			_model.create(checker, (err: any, result: CheckerModel) => {
				err ? reject(err) : resolve(result)
			})
		});
	}

	static update(checker: CheckerModel): Promise<CheckerModel> {
		return new Promise<CheckerModel>((resolve, reject) => {
			_model.update({ _id: checker._id }, checker, {}, (err, rawResponse) => {
				err ? reject(err) : resolve(rawResponse)
			})
		});
	}
}

export { Checker }
