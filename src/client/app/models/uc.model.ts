import { NodeModel } from './node.model';
export class UcModel {
	_id: string = null;
	groupId: string = null;
	title: string = null;
	ucKey: string = null;
	sleep: number = null;
	build: boolean = true;
	handler: boolean = false;
	only: boolean = false;
	dataStatus: number = 1;
	code: string = null;
	nodes: Array<NodeModel>;
}

export namespace UcHelper {
	export function buildModel(sourceModel: any): UcModel {
		let newMode: any ;
		newMode = new UcModel();
		let propertyNames: Array<String> = Object.getOwnPropertyNames(newMode);
		propertyNames.forEach((key: string) => {
			if (sourceModel[key + ""]){
				newMode[key] = sourceModel[key + ""];
			}
		})
		return newMode;
	}
}