import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Uc, UcGroup,UcModel, UcGroupModel, UserModel ,UcGroupHelper,UcHelper} from '../models/index';

class UcGroupController extends BaseController {
	@router({
		method: 'get',
		path: '/api/projects/:projectId/ucgroups'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.params.projectId) {
			let result = await UcGroup.find({ "projectId": req.params.projectId,dataStatus:1 });
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}

	@router({
		method: 'post',
		path: '/api/projects/:projectId/ucgroups'
	})
	async create(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
    let ucGroupModel: UcGroupModel = UcGroupHelper.buildModel(req.body);
		ucGroupModel.setCreatedInfo(user);
		let result = await UcGroup.insert(ucGroupModel);
		res.send(super.wrapperRes(result));
	}


	@router({
		method: 'patch',
		path: '/api/ucgroups/:groupId'
	})
	async update(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
    	let ucGroupModel: UcGroupModel = UcGroupHelper.buildModel(req.body);
		ucGroupModel.setModifiedInfo(user);
		let result = await UcGroup.update(req.body);
		res.send(super.wrapperRes(result));
	}

  @router({
    method: 'delete',
    path: '/api/ucgroups/:groupId'
  })
  async delete(req: e.Request, res: e.Response) {
    let user: UserModel = super.getUser(req);
    let result = await UcGroup.delete(req.params.groupId, user._id);
    res.send(super.wrapperRes(result));
  }

	@router({
		method: 'get',
		path: '/api/ucgroups/:groupId/ucs'
	})
	async findGroupUcs(req: e.Request, res: e.Response) {
		let result = await Uc.find({ "groupId": req.params.groupId });
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'get',
		path: '/api/ucgroups/:groupId'
	})
	async findGroupUc(req: e.Request, res: e.Response) {
		let result = await UcGroup.find({ "_id": req.params.groupId });
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'post',
		path: '/api/ucgroups/:groupId/ucs'
	})
	async addUc(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let ucModel: UcModel = UcHelper.buildModel(req.body);
		ucModel.setCreatedInfo(user);
		let result = await Uc.insert(ucModel);
		res.send(super.wrapperRes(result));
	}
}

export default UcGroupController
