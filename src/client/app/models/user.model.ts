import { BaseHelper, BaseModel } from './base.model';

export class UserModel extends BaseModel {
	_id: string;
	username: string;
	password: string;
	name: string;
	email: string;
	mobile: string;
}

export namespace UserHelper {
	export function buildModel(sourceModel: any, clean: boolean = false,filter:any = {}): UserModel {
		let newMode: any ;
		newMode = new UserModel();
		let propertyNames: Array<String> = Object.getOwnPropertyNames(newMode);
		propertyNames.forEach((key: string) => {
			if (!filter[key]){
				if (BaseHelper.has(sourceModel[key])) {
					newMode[key] = sourceModel[key + ""];
				}
			}
			if ((clean && !BaseHelper.has(newMode[key])) || filter[key]) {
				delete newMode[key];
			}
		})
		return newMode;
	}
}
