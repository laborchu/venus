import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Path, PathModel } from '../models/index';
import ErrorCode from '../ErrorCode';

class PathController extends BaseController {
	@router({
		method: 'get',
		path: '/api/nodes/:nodeId/paths'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.params.nodeId) {
			let nodeArray = await Path.find({ nodeId: req.params.nodeId });
			res.send(super.wrapperRes(nodeArray));
		} else {
			res.send(super.wrapperRes([]));
		}
	}
}

export default PathController