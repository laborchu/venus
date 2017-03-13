import { UcModel } from './uc.model';
export class UcGroupModel{
	_id: string = null;
	projectId: string = null;
	name: string = null;
	dataStatus: number = null;
	ucs: Array<UcModel>;
}

export namespace UcGroupHelper {
	export function buildModel(sourceModel: any): UcGroupModel {
		let newModel: any;
		newModel = new UcGroupModel();
		let propertyNames: Array<String> = Object.getOwnPropertyNames(newModel);
		propertyNames.forEach((key: string) => {
			if (sourceModel[key + ""]) {
				newModel[key] = sourceModel[key + ""];
			}
		})
		return newModel;
	}
}
