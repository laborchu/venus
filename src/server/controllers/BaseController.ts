import e = require('express');

class BaseController {
	wrapperRes(data: any) {
		return { data: data };
	}
	
	aotoRoute(req: e.Request, res:e.Response) {
	}
}

//const user = new BaseController()
export default BaseController