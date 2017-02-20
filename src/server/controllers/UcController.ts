import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Uc } from '../models/Uc';

class UcController extends BaseController {
	@router({
		method: 'get',
		path: '/api/ucs/:ucId'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.params.ucId) {
			let result = await Uc.find({ "_id": req.params.ucId });
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}

	@router({
		method: 'patch',
		path: '/api/ucs/:ucId'
	})
	async update(req: e.Request, res: e.Response) {
		let result = await Uc.update(req.body);
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'delete',
		path: '/api/ucs/:ucId'
	})
	async delete(req: e.Request, res: e.Response) {
		let result = await Uc.delete(req.params.ucId);
		res.send(super.wrapperRes(result));
	}
}

export default UcController