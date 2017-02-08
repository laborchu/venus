import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { UcGroup } from '../models/UcGroup';

class UcGroupController extends BaseController {
	@router({
		method: 'get',
		path: '/api/ucgroups'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.query.projectId){
			let result = await UcGroup.find(req.query.projectId);
			res.send(super.wrapperRes(result));
		}else{
			res.send(super.wrapperRes([]));
		}
	}
}

export default UcGroupController