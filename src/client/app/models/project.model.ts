import { UcGroupModel } from './uc-group.model';
export class ProjectModel {
	_id: string = null;
	name: string = null;
	ucGroups: Array<UcGroupModel>;
}

export namespace ProjectHelper {
	export function buildModel(sourceModel: any): ProjectModel {
		let newModel: any;
		newModel = new ProjectModel();
		let propertyNames: Array<String> = Object.getOwnPropertyNames(newModel);
		propertyNames.forEach((key: string) => {
			if (sourceModel[key + ""]) {
				newModel[key] = sourceModel[key + ""];
			}
		})
		return newModel;
	}
}
