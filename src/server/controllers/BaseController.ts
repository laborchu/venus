import e = require('express');

enum RespCode {
	SUCCESS=1,
	FAIL=0
}

class BaseController {
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