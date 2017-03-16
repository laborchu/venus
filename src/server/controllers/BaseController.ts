import e = require('express');
import { MvSession } from '../models/index';

enum RespCode {
	SESSION_OUT=2,
	SUCCESS=1,
	FAIL=0
}

class BaseController {

	getUser(req: e.Request) {
		let mvSession: MvSession = <MvSession>req.session;
		return mvSession.user;
	}

	wrapperRes(data: any) {
		return { code: RespCode.SUCCESS, data: data };
	}

	wrapperErrorRes(msg: string) {
		return { code: RespCode.FAIL, msg: msg };
	}

	aotoRoute(req: e.Request, res: e.Response) {
	}
}

//const user = new BaseController()
export default BaseController