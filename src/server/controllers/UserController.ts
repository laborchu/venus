import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Uc, UcGroup,User,UcGroupModel, UserModel,UserHelper} from '../models/index';

class UserController extends BaseController {

  @router({
    method: 'post',
    path: '/api/user/setting'
  })
  async create(req: e.Request, res: e.Response) {
    let result = await User.insert(req.body);
    res.send(super.wrapperRes(result));
  }


	@router({
		method: 'patch',
		path: '/api/user/setting'
	})
	async update(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let userModel: UserModel = UserHelper.buildModel(req.body);
		userModel._id=user._id;
		userModel.setModifiedInfo(user);

		let result = await User.update(req.body);
		res.send(super.wrapperRes(result));

	}



}

export default UserController
