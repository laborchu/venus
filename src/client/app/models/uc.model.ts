import { NodeModel } from './node.model';
import { BaseHelper, BaseModel } from './base.model';

export class UcModel extends BaseModel {
	_id: string = null;
	projectId: string = null;
	groupId: string = null;
	title: string = null;
	ucKey: string = null;
	sleep: number = null;
	build: boolean = true;
	handler: boolean = false;
	handlerCode: string = null;
	only: boolean = false;
	code: string = null;
	nodes: Array<NodeModel>;
}

export namespace UcHelper {
	export function buildModel(sourceModel: any, clean: boolean = false,filter:any = {}): UcModel {
		let newMode: any ;
		newMode = new UcModel();
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
