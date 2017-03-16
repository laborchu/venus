import { BaseHelper, BaseModel } from './base.model';
export class ProjectJsModel extends BaseModel{
	_id: string;
	projectId: string;
	fixed: boolean;
	name: string;
	jsName: string;
	script: string;
	requires: Array<string>;
}