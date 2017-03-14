import { UcGroupModel } from './uc-group.model';
import { BaseHelper } from './base.model';

export enum Platform {
	ios,
	android
}

export class ProjectModel {
	_id: string = null;
	name: string = null;
	platform: string = null;
	order: number = null;
	ucGroups: Array<UcGroupModel>;
}

export class AndroidProjectModel extends ProjectModel {
	platform: string = Platform[Platform.android];
	package: string = null;
	activity: string = null;
	udid: string = null;
}

export class IosProjectModel extends ProjectModel {
	platform: string = Platform[Platform.ios];
	platformVersion: string = null;
	bundleId: string = null;
	deviceName: string = null;
	udid: string = null;
}

export namespace ProjectHelper {
	export function getTypes(): Array<string> {
		var keys = Object.keys(Platform);
		return keys.slice(keys.length / 2, keys.length);
	}

	export function getField(model: ProjectModel): Set<String> {
		let propertyNames: Array<String> = Object.getOwnPropertyNames(model);
		let propertyMap: Set<String> = new Set();
		propertyNames.forEach((value) => {
			propertyMap.add(value);
		})
		return propertyMap;
	}

	export function buildModel(type: string, sourceModel: any, filter: any = {}): [ProjectModel, Set<String>] {
		let newModel: any;
		let field: Set<String>;
		if (type == Platform[Platform.ios]) {
			newModel = new IosProjectModel();
			field = getField(newModel);
		} else if (type == Platform[Platform.android]) {
			newModel = new AndroidProjectModel();
			field = getField(newModel);
		} 

		let propertyNames: Array<String> = Object.getOwnPropertyNames(newModel);
		propertyNames.forEach((key: string) => {
			if (key != "platform" && BaseHelper.has(sourceModel[key])) {
				newModel[key] = sourceModel[key];
			}
			if (filter[key]) {
				delete newModel[key];
			}
		})
		return [newModel, field];
	}
}
