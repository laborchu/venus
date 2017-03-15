import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import ErrorCode from "../ErrorCode";
import { User, UserModel, MvSession } from '../models/index';

class SessionController extends BaseController {

	@router({
		method: 'get',
		path: '/open/session'
	})
	async getSession(req: e.Request, res: e.Response) {
		let mvSession: MvSession = <MvSession>req.session;
		res.send(super.wrapperRes(mvSession.user));
	}


	@router({
		method: 'post',
		path: '/open/session'
	})
	async login(req: e.Request, res: e.Response) {

		let result = await User.find({
			"username": req.body.username,
			"password": req.body.password
		});
		if (result.length>0){
			let mvSession: MvSession = <MvSession>req.session;
			mvSession.user = result[0];
			res.send(super.wrapperRes(result));
		}else{
			
			res.send(super.wrapperErrorRes(ErrorCode.LOGIN_ERROR));
		}
		
	}
}

export default SessionController