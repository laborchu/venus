import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Node,NodeModel, UserModel } from '../models/index';

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
		method: 'get',
		path: '/api/ucs/:ucId/nodes'
	})
	async getUcNodes(req: e.Request, res: e.Response) {
		if (req.params.ucId) {
			let result = await Node.find({ ucId: req.params.ucId });
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
		let user: UserModel = super.getUser(req);
		let node: NodeModel = req.body;
		if (req.body._id) {
			node.setModifiedInfo(user);
			let result = await Node.update(node);
			res.send(super.wrapperRes(result));
		} else {
			node.setCreatedInfo(user);
			let result = await Node.insert(node);
			res.send(super.wrapperRes(result));
		}
	}


	@router({
		method: 'delete',
		path: '/api/nodes/:nodeId'
	})
	async deleteNode(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		if (req.params.nodeId) {
			let result = await Node.delete(req.params.nodeId, user._id);
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}
}

export default NodeController