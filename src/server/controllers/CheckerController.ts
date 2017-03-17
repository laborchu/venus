import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import { Checker} from '../models/index';
import ErrorCode from '../ErrorCode';

class CheckerController extends BaseController {

  @router({
    method: 'get',
    path: '/api/nodes/:nodeId/paths/:pathId'
  })
  async findCheckers(req: e.Request, res: e.Response) {
    if (req.params.pathId) {
      let nodeArray = await Checker.find({ pathId: req.params.pathId });
      res.send(super.wrapperRes(nodeArray));
    } else {
      res.send(super.wrapperRes([]));
    }
  }

}

export default CheckerController
