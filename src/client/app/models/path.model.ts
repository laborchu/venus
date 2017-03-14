import { CheckerModel } from './checker.model';
import { BaseHelper } from './base.model';

enum Selector {
	xpath,
	name,
	className,
	id
}

export enum PathType {
	click,
	tap,
	clicks,
	get,
	gets,
	input,
	keys,
	press,
	pope
}

export namespace PathHelper {
	export function getTypes(): Array<string> {
		var keys = Object.keys(PathType);
		return keys.slice(keys.length / 2, keys.length);
	}
	export function getSelector(): Array<string> {
		var keys = Object.keys(Selector);
		return keys.slice(keys.length / 2, keys.length);
	}
	export function getField(model: PathModel): Set<String> {
		let propertyNames: Array<String> = Object.getOwnPropertyNames(model);
		let propertyMap: Set<String> = new Set();
		propertyNames.forEach((value) => {
			propertyMap.add(value);
		})
		return propertyMap;
	}
	export function buildModel(type: string, oldModel: any, clean: boolean = false,filter:any = {}): [PathModel, Set<String>] {
		let newMode: any;
		let field: Set<String>;
		if (type == PathType[PathType.click]) {
			newMode = new ClickPathModel();
			field = getField(newMode);
		} else if (type == PathType[PathType.tap]) {
			newMode = new TapPathModel();
			field = getField(newMode);
		} else if (type == PathType[PathType.clicks]) {
			newMode = new ClicksPathModel();
			field = getField(newMode);
		} else if (type == PathType[PathType.get]) {
			newMode = new GetPathModel();
			field = getField(newMode);
		} else if (type == PathType[PathType.gets]) {
			newMode = new GetsPathModel();
			field = getField(newMode);
		} else if (type == PathType[PathType.input]) {
			newMode = new InputPathModel();
			field = getField(newMode);
		}else if (type == PathType[PathType.keys]) {
      newMode = new KeysPathModel();
      field = getField(newMode);
    } else if (type == PathType[PathType.press]) {
			newMode = new PressPathModel();
			field = getField(newMode);
		} else if (type == PathType[PathType.pope]) {
			newMode = new PopePathModel();
			field = getField(newMode);
		}

		if (newMode) {
			let propertyNames: Array<String>;
			if (clean) {
				propertyNames = Object.getOwnPropertyNames(newMode);
			} else {
				propertyNames = Object.getOwnPropertyNames(oldModel);
			}
			propertyNames.forEach((key: string) => {
				if (key != "type" && BaseHelper.has(oldModel[key])) {
					newMode[key] = oldModel[key];
				}
				if ((clean && !BaseHelper.has(newMode[key])) || filter[key]) {
					delete newMode[key];
				}
			})
		}
		return [newMode, field];
	}
}

export class PathModel {

	_id: string = null;
	type: string = null;
	ucId: string = null;
	nodeId: string = null;
	title: string = null;
	sleep: number = null;
	canNull: boolean = false;
	cacheElement: boolean = false;
	cacheDesc: boolean = false;
	dataStatus: number = 1;
	order: number = null;
	checker: Array<CheckerModel>

}

export class ClickPathModel extends PathModel {
	type: string = PathType[PathType.click];
	selector: string = null;
	element: string = null;
	inThen: boolean = false;
}

export class TapPathModel extends PathModel {
	type: string = PathType[PathType.tap];
	selector: string = null;
	element: string = null;
}

export class ClicksPathModel extends PathModel {
	type: string = PathType[PathType.clicks];
}

export class GetPathModel extends PathModel {
	type: string = PathType[PathType.get];
	selector: string = null;
	element: string = null;
	index: number = null;
	mode: string = null;
	filter: any = null;
}

export class GetsPathModel extends PathModel {
	type: string = PathType[PathType.gets];
	selector: string = null;
	element: string = null;
	limit: number = null;
}

export class InputPathModel extends PathModel {
	type: string = PathType[PathType.input];
	selector: string = null;
	element: string = null;
	value: string = null;
}

export class KeysPathModel extends PathModel {
	type: string = PathType[PathType.keys];
	value: string = null;
}

export class PressPathModel extends PathModel {
	type: string = PathType[PathType.press];
	selector: string = null;
	element: string = null;
	value: string = null;
}

export class PopePathModel extends PathModel {
	type: string = PathType[PathType.pope];
}



