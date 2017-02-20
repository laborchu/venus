import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Node } from '../models/Node';

class NodeController extends BaseController {

	@router({
		method: 'get',
		path: '/api/nodes/:nodeId'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.params.nodeId) {
			let result = await Node.find({ _id: req.params.nodeId });
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}

	@router({
		method: 'put',
		path: '/api/ucs/:ucId/nodes'
	})
	async saveNode(req: e.Request, res: e.Response) {
		if (req.body._id) {
			let result = await Node.update(req.body);
			res.send(super.wrapperRes(result));
		} else {
			let result = await Node.insert(req.body);
			res.send(super.wrapperRes(result));
		}
	}


	@router({
		method: 'delete',
		path: '/api/nodes/:nodeId'
	})
	async deleteNode(req: e.Request, res: e.Response) {
		if (req.params.nodeId) {
			let result = await Node.delete(req.params.nodeId);
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}
}

export default NodeController