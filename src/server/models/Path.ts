'use strict';
import BaseModel from "./BaseModel";
import mongoose = require('mongoose');

const _schema = new mongoose.Schema({
  title: { type: String },
  sleep: { type: Number },
  dataStatus: { type: Number },
  ucId: { type: mongoose.Schema.Types.ObjectId, ref: 'ucs' }
});
const _model = mongoose.model<mongoose.Document>('paths', _schema);

class Path extends BaseModel {
  constructor() {
    super()
  }

}

export { Path }
