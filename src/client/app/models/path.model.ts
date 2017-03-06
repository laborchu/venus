import { CheckerModel } from './checker.model.ts';
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
	keys
}

export namespace PathHelper {
	export function getTypes(): Array < string > {
		var keys = Object.keys(PathType);
		return keys.slice(keys.length / 2, keys.length);
	}
	export function getSelector(): Array<string> {
		var keys = Object.keys(Selector);
		return keys.slice(keys.length / 2, keys.length);
	}
	export function getField(model: PathModel): Set<String> {
		let propertyNames:Array<String> = Object.getOwnPropertyNames(model);
		let propertyMap:Set<String> = new Set();
		propertyNames.forEach((value)=>{
			propertyMap.add(value);
		})
		return propertyMap;
	}
	export function buildModel(typeStr: string, oldModel: any): [PathModel, Set<String>] {
		let type: PathType = (<any>PathType)[typeStr];
		let newMode: any;
		let field: Set<String>;
		if (type == PathType.click){
			newMode = new ClickPathModel();
			field = getField(newMode);
		} else if (type == PathType.tap) {
			newMode = new TapPathModel();
			field = getField(newMode);
		} else if (type == PathType.clicks) {
			newMode = new ClicksPathModel();
			field = getField(newMode);
		} else if (type == PathType.get) {
			newMode = new GetPathModel();
			field = getField(newMode);
		} else if (type == PathType.gets) {
			newMode = new GetsPathModel();
			field = getField(newMode);
		} else if (type == PathType.input) {
			newMode = new InputPathModel();
			field = getField(newMode);
		}
		if (newMode){
			let propertyNames: Array<String> = Object.getOwnPropertyNames(oldModel);
			propertyNames.forEach((key:string)=>{
				if (key != "type") {
					newMode[key + ""] = oldModel[key + ""];
				}
			})
		}
		return [newMode, field];
	}
}

export class PathModel {
	_id: string = void 0;
	title: string = void 0;
	nodeId: string = void 0;
  sleep: string = void 0;
	canNull: boolean = false;
	cacheElement: boolean = false;
	cacheDesc: boolean = false;
  checker:Array<CheckerModel>
}

export class ClickPathModel extends PathModel{
	type: PathType = PathType.click;
	selector: Selector = void 0;
	element: string = void 0;
	inThen: boolean = false;
}

export class TapPathModel extends PathModel {
	type: PathType = PathType.tap;
	selector: Selector = void 0;
	element: string = void 0;
}

export class ClicksPathModel extends PathModel {
	type: PathType = PathType.clicks;
}

export class GetPathModel extends PathModel {
	type: PathType = PathType.get;
	selector: Selector = void 0;
	element: string = void 0;
	index: number = void 0;
	mode: string = void 0;
	filter: string = void 0;
}

export class GetsPathModel extends PathModel {
	type: PathType = PathType.gets;
	selector: Selector = void 0;
	element: string = void 0;
	limit: number = void 0;
}

export class InputPathModel extends PathModel {
	type: PathType = PathType.input;
	selector: Selector = void 0;
	element: string = void 0;
	value: string = void 0;
}

export class KeysPathModel extends PathModel {
	type: PathType = PathType.keys;
	value: string = void 0;
}



