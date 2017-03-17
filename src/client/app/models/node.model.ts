import { PathModel } from './path.model';
import { BaseHelper, BaseModel } from './base.model';
export class NodeModel extends BaseModel {
	_id: string = null;
	projectId: string = null;
	ucId: string = null;
	title: string = null;
	parentId: string = null;
	isParent: boolean = false;
	children: Array<NodeModel>;
	paths: Array<PathModel>;
}

export namespace NodeHelper{
	export function buildModel(sourceModel: any, clean: boolean = false, filter: any = {}): NodeModel {
		let newMode: any;
		newMode = new NodeModel();
		let propertyNames: Array<String> = Object.getOwnPropertyNames(newMode);
		propertyNames.forEach((key: string) => {
			if (!filter[key]) {
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