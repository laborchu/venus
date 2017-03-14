import { UcModel } from './uc.model';
import { BaseHelper } from './base.model';

export class UcGroupModel{
	_id: string = null;
	projectId: string = null;
	name: string = null;
	order: number = null;
	dataStatus: number = null;
	ucs: Array<UcModel>;
}

export namespace UcGroupHelper {
	export function buildModel(sourceModel: any): UcGroupModel {
		let newModel: any;
		newModel = new UcGroupModel();
		let propertyNames: Array<String> = Object.getOwnPropertyNames(newModel);
		propertyNames.forEach((key: string) => {
			if (sourceModel) {
				newModel[key] = sourceModel[key + ""];
			}
		})
		return newModel;
	}
}
