import { UserModel } from './user.model';

export namespace BaseHelper {
	export function has(value:any): boolean {
		return value!=undefined&&value!=null;
	}
}


export class BaseModel{
	dataStatus: number = 1;
	order: number = null;
	createdBy: string = null;
	createdDate: Date = null;
	modifiedBy: string = null;
	modifiedDate: Date = null;

	public setCreatedInfo(user: UserModel){
		this.createdBy = user._id;
		this.createdDate = new Date();
		this.modifiedBy = user._id;
		this.modifiedDate = new Date();
	}

	public setModifiedInfo(user: UserModel) {
		this.modifiedBy = user._id;
		this.modifiedDate = new Date();
	}
}
