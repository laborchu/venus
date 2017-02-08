import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Project } from '../models/Project';

class ProjectController extends BaseController {
	@router({
		method: 'get',
		path: '/api/projects'
	})
	async find(req: e.Request, res: e.Response) {
		let result = await Project.find();
		res.send(super.wrapperRes(result));
	}


	@router({
		method: 'post',
		path: '/api/projects'
	})
	async create(req: e.Request, res: e.Response) {
		let result = await Project.insert(req.body);
		res.send(super.wrapperRes(result));
	}
}

export default ProjectController