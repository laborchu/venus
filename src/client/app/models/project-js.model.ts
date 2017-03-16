import { BaseHelper, BaseModel } from './base.model';
export class ProjectJsModel extends BaseModel{
	_id: string;
	projectId: string;
	fixed: boolean;
	name: string;
	jsName: string;
	script: string;
	requires: Array<string>;
}
export namespace ProjectJsHelper {
  export function buildModel(sourceModel: any): ProjectJsModel {
    let newModel: any;
    newModel = new ProjectJsModel();
    let propertyNames: Array<String> = Object.getOwnPropertyNames(newModel);
    propertyNames.forEach((key: string) => {
      if (sourceModel) {
        newModel[key] = sourceModel[key + ""];
      }
    })
    return newModel;
  }
}
