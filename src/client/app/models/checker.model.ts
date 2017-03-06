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
  export function buildModel(typeStr: string, oldModel: any): [CheckerModel, Set<String>] {
    let type: CheckType = (<any>CheckType)[typeStr];
    let newMode: any;
    let field: Set<String>;
    if (type == CheckType.eq){
      newMode = new EqCheckerModel();
      field = getField(newMode);
    } else if (type == CheckType.eqs) {
      newMode = new EqCheckerModel();
      field = getField(newMode);
    } else if (type == CheckType.prop) {
      newMode = new PropCheckerModel();
      field = getField(newMode);
    } else if (type == CheckType.cmd) {
      newMode = new CmdCheckerModel();
      field = getField(newMode);
    } else if (type == CheckType.eexist) {
      newMode = new EexistCheckerModel();
      field = getField(newMode);
    } else if (type == CheckType.length) {
      newMode = new EqCheckerModel();
      field = getField(newMode);
    }else if (type == CheckType.iftrue) {
      newMode = new IftrueCheckerModel();
      field = getField(newMode);
    }else if (type == CheckType.stop) {
      newMode = new EqCheckerModel();
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

export class CheckerModel {
  _id: string;
}
export class EqCheckerModel extends CheckerModel {
  selector:string = void 0;
  element:string = void 0;
  value:string = void 0;
}

export class PropCheckerModel extends CheckerModel {
  key:string = void 0;
  op:string = void 0;
  value:string = void 0;
}

export class CmdCheckerModel extends CheckerModel {
  cmdCode:string = void 0;
}

export class EexistCheckerModel extends CheckerModel {
  eexist:string = void 0;
  element:string = void 0;
}

export class IftrueCheckerModel extends CheckerModel {
  selector:string = void 0;
  element:string = void 0;
  value:string = void 0;
  paths:string = void 0;
}

