import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Path, PathModel,Checker,CheckerModel} from '../models/index';
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
    method: 'get',
    path: '/api/nodes/:nodeId/paths/:pathId'
  })
  async findPaths(req: e.Request, res: e.Response) {
    if (req.params.pathId) {
      let nodeArray = await Checker.find({ pathId: req.params.pathId });
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
      let result = await Path.remove({pathId:req.params.pathId});
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
    let result = await Path.insert(req.body);
    req.body.checker.forEach(function (data:CheckerModel) {
      data.pathId = result._id
      data.nodeId = result.nodeId
      data.ucId = result.ucId
      Checker.insert(data)
    })
    res.send(super.wrapperRes(result));
	}

  @router({
    method: 'patch',
    path: '/api/nodes/:nodeId/paths'
  })
  async updateScript(req: e.Request, res: e.Response) {
    Checker.remove({ pathId: req.body._id });
    req.body.checker.forEach(function (data:CheckerModel) {
      data.pathId = req.body._id
      data.nodeId = req.body.nodeId
      data.ucId = req.body.ucId
      Checker.insert(data)
    })
    let result = await Path.updatePath(req.body);
    res.send(super.wrapperRes(result));
  }
}

export default PathController
