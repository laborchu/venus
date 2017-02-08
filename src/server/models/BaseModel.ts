'use strict';
import * as mongoose from 'mongoose';

/**
 * Module dependencies.
 */
class BaseModel {
	static _model: mongoose.Model<mongoose.Document>;
	inspect(options?: Object): string {
		return ''
	}
}

export default BaseModel