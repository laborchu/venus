import e = require('express');
import {
  Project, UcGroup, Uc, Node, Path, Checker, ProjectJs, UserModel,
  ProjectModel, ProjectJsModel, UcGroupModel, UcModel, NodeModel, PathModel, CheckerModel,
  ProjectHelper, UcGroupHelper, UcHelper, NodeHelper, PathHelper, CheckHelper
} from '../models/index';
let loadNodePath = async function(nodeModel: NodeModel, filterField: any): Promise<Array<PathModel>> {
  let pathArray: Array<PathModel> = await Path.find({ "nodeId": nodeModel._id });
  let paths: Array<PathModel> = [];
  for (let pathModel of pathArray) {//path
    let checkerArray: Array<CheckerModel> = await Checker.find({ "pathId": pathModel._id});
    let checkers: Array<CheckerModel> = [];
    for (let checker of checkerArray) {//checker
      [checker] = CheckHelper.buildModel(checker.type, checker, true, filterField);
      checkers.push(checker);
    }
    [pathModel] = PathHelper.buildModel(pathModel.type, pathModel, true, filterField);
    if (checkers.length > 0) {
      pathModel.checker = checkers;
    } else {
      delete pathModel.checker;
    }
    paths.push(pathModel);
  }

  return new Promise<Array<PathModel>>((resolve, reject) => {
    resolve(paths);
  });
}
class UcServices {

  static async updateUccode(ucId:string){
    if (ucId) {
      let filterField = {
        "_id": true, "projectId": true, "filterStr": true,
        "groupId": true, "dataStatus": true, "order": true,
        "ucId": true, "nodeId": true, "pathId": true, "parentId": true,
        "isParent": true,
        "createdBy": true, "createdDate": true, "modifiedBy": true, "modifiedDate": true
      };
      let result = await Uc.find({ "_id": ucId });
      let ucModel: UcModel = UcHelper.buildModel(result[0]);
      delete ucModel.handlerCode;
      delete ucModel.code;
      let nodeArray: Array<NodeModel> = await Node.find({ "ucId": ucModel._id});

      let nodeTree: Array<NodeModel> = [];
      let curNode:NodeModel = null;
      for (let nodeModel of nodeArray) {//Node
        let paths: Array<PathModel> = await loadNodePath(nodeModel, filterField);
        nodeModel = NodeHelper.buildModel(nodeModel, true, filterField);
        nodeModel.paths = paths;
        if (nodeModel.parentId) {
          curNode.children.push(nodeModel);
        }else{
          curNode = nodeModel;
          curNode.children = [];
          nodeTree.push(nodeModel);
        }
      }
      ucModel = UcHelper.buildModel(ucModel, true, filterField);
      ucModel.nodes = nodeTree;
      result[0].code = "module.exports ="+JSON.stringify(ucModel, null, "\t")
      await Uc.update(result[0]);
    }
  }

}
export { UcServices }
