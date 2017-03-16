import { BaseHelper, BaseModel } from './base.model';

export class UserModel extends BaseModel {
	_id: string;
	username: string;
	password: string;
	name: string;
	email: string;
	mobile: string;
}