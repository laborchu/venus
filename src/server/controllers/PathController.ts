import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Path, PathModel, Checker, CheckerModel, UserModel ,PathHelper,CheckHelper} from '../models/index';
import ErrorCode from '../ErrorCode';

class PathController extends BaseController {
  @router({
    method: 'get',
    path: '/api/nodes/:nodeId/paths'
  })
  async find(req: e.Request, res: e.Response) {
    if (req.params.nodeId) {
      let nodeArray = await Path.find({ nodeId: req.params.nodeId });
      res.send(super.wrapperRes(nodeArray));
    } else {
      res.send(super.wrapperRes([]));
    }
  }

  @router({
    method: 'delete',
    path: '/api/nodes/:nodeId/paths/:pathId'
  })
  async deletePath(req: e.Request, res: e.Response) {
    if (req.params.nodeId) {
      Checker.remove({ pathId: req.params.pathId });
      let result = await Path.remove({ _id: req.params.pathId });
      res.send(super.wrapperRes(result));
    } else {
      res.send(super.wrapperRes([]));
    }
  }

  @router({
    method: 'post',
    path: '/api/nodes/:nodeId/paths'
  })
  async create(req: e.Request, res: e.Response) {
    let user: UserModel = super.getUser(req);
    let pathModel: PathModel
    [pathModel]  = PathHelper.buildModel(req.body.type,req.body);
    pathModel.setCreatedInfo(user);
    let result = await Path.insert(pathModel);
    for (let checkerModel of  req.body.checker) {//UcGroup
      [checkerModel] = CheckHelper.buildModel(checkerModel.type,checkerModel);
      checkerModel.pathId = req.body._id;
      checkerModel.nodeId = req.body.nodeId;
      checkerModel.ucId = req.body.ucId;
      checkerModel.setCreatedInfo(user);
      Checker.insert(checkerModel);
    }
    res.send(super.wrapperRes(result));
  }

  @router({
    method: 'patch',
    path: '/api/nodes/:nodeId/paths'
  })
  async updatePath(req: e.Request, res: e.Response) {
    let user: UserModel = super.getUser(req);
    Checker.remove({ pathId: req.body._id });
    for (let checkerModel of  req.body.checker) {//UcGroup
      [checkerModel] = CheckHelper.buildModel(checkerModel.type,checkerModel);
      checkerModel.pathId = req.body._id;
      checkerModel.nodeId = req.body.nodeId;
      checkerModel.ucId = req.body.ucId;
      checkerModel.setCreatedInfo(user);
      Checker.insert(checkerModel);
    }
    // req.body.checker.forEach(function(data: CheckerModel) {
    //   data.pathId = req.body._id;
    //   data.nodeId = req.body.nodeId;
    //   data.ucId = req.body.ucId;
    //   data.setCreatedInfo(user);
    //   Checker.insert(data);
    // })
    let pathModel: PathModel
    [pathModel]  = PathHelper.buildModel(req.body.type,req.body);
    pathModel.setModifiedInfo(user);
    let result = await Path.updatePath(req.body);
    res.send(super.wrapperRes(result));
  }
}

export default PathController
