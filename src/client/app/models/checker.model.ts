import { BaseHelper } from './base.model';

export enum CheckType {
  eq,
  eqs,
  prop,
  cmd,
  eexist,
  iftrue,
  length,
  stop
}

export namespace CheckHelper {
  export function getTypes(): Array < string > {
    var keys = Object.keys(CheckType);
    return keys.slice(keys.length / 2, keys.length);
  }
  export function getField(model: CheckerModel): Set<String> {
    let propertyNames:Array<String> = Object.getOwnPropertyNames(model);
    let propertyMap:Set<String> = new Set();
    propertyNames.forEach((value)=>{
      propertyMap.add(value);
    })
    return propertyMap;
  }
  export function buildModel(typeStr: string, oldModel: any, clean: boolean = false, filter: any = {}): [CheckerModel, Set<String>] {
    let newMode: any;
    let field: Set<String>;
    if (typeStr == CheckType[CheckType.eq]){
      newMode = new EqCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.eqs]) {
      newMode = new EqCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.prop]) {
      newMode = new PropCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.cmd]) {
      newMode = new CmdCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.eexist]) {
      newMode = new EexistCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.length]) {
      newMode = new EqCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.iftrue]) {
      newMode = new IftrueCheckerModel();
      field = getField(newMode);
    } else if (typeStr == CheckType[CheckType.stop]) {
      newMode = new EqCheckerModel();
      field = getField(newMode);
    }
    if (newMode){
      let propertyNames: Array<String>;
      if (clean) {
        propertyNames = Object.getOwnPropertyNames(newMode);
      } else {
        propertyNames = Object.getOwnPropertyNames(oldModel);
      }
      propertyNames.forEach((key:string)=>{
        newMode[key] = oldModel[key];
        if ((clean && !BaseHelper.has(newMode[key])) || filter[key]) {
          delete newMode[key];
        }
      })
    }
    return [newMode, field];
  }
}

export class CheckerModel {
  _id: string;
  title: string;
  type: string = null;
  ucId: string = null;
  nodeId: string = null;
  pathId: string = null;
  order: number = null;
  dataStatus: number = 1;
}
export class EqCheckerModel extends CheckerModel {
  type: string = CheckType[CheckType.eq];
  selector:string = void 0;
  element:string = void 0;
  value:string = void 0;
}

export class PropCheckerModel extends CheckerModel {
  type: string = CheckType[CheckType.prop];
  key:string = void 0;
  op:string = void 0;
  value:string = void 0;
}

export class CmdCheckerModel extends CheckerModel {
  type: string = CheckType[CheckType.cmd];
  cmdCode:string = void 0;
}

export class EexistCheckerModel extends CheckerModel {
  type: string = CheckType[CheckType.eexist];
  eexist:string = void 0;
  element:string = void 0;
}

export class IftrueCheckerModel extends CheckerModel {
  type: string = CheckType[CheckType.iftrue];
  selector:string = void 0;
  element:string = void 0;
  value:string = void 0;
  paths:string = void 0;
}

