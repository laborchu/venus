import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { ProjectJs, UserModel } from '../models/index';

class ProjectController extends BaseController {
	@router({
		method: 'get',
		path: '/api/projects/:projectId/js'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.params.projectId) {
			let result = await ProjectJs.find({
				"projectId": req.params.projectId
			}, {
					_id: true,
					name: true
				}
			);
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}

	}

	@router({
		method: 'get',
		path: '/api/projectjs/:jsId'
	})
	async get(req: e.Request, res: e.Response) {
		if (req.params.jsId) {
			let result = await ProjectJs.find({
				"_id": req.params.jsId
			}
			);
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}

	@router({
		method: 'post',
		path: '/api/projects/:projectId/js'
	})
	async create(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let result = await ProjectJs.insert(req.body, user._id);
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'patch',
		path: '/api/projectjs/:jsId/script'
	})
	async updateScript(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let result = await ProjectJs.update(req.body, user._id);
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'patch',
		path: '/api/projectjs/:jsId'
	})
	async updateJs(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let result = await ProjectJs.update(req.body, user._id);
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'delete',
		path: '/api/projectjs/:jsId'
	})
	async delete(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let result = await ProjectJs.delete(req.params.jsId, user._id);
		res.send(super.wrapperRes(result));
	}
}

export default ProjectController