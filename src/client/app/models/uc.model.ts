import { NodeModel } from './node.model';
import { BaseHelper } from './base.model';

export class UcModel {
	_id: string = null;
	projectId: string = null;
	groupId: string = null;
	title: string = null;
	ucKey: string = null;
	sleep: number = null;
	build: boolean = true;
	handler: boolean = false;
	only: boolean = false;
	dataStatus: number = 1;
	code: string = null;
	order: number = null;
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