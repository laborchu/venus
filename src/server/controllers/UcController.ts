import e = require('express');
let path = require("path");
let fs = require("fs");
let _ = require('lodash');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
import {
	Project, Uc, UcGroup, Node, Path, Checker, UserModel,
	UcModel, ProjectModel, NodeModel, PathModel, CheckerModel,
	UcHelper, NodeHelper, PathHelper, CheckHelper
} from '../models/index';
import ErrorCode from '../ErrorCode';
var requireFromString = require('require-from-string');

class UcController extends BaseController {
	@router({
		method: 'get',
		path: '/api/ucs/:ucId'
	})
	async find(req: e.Request, res: e.Response) {
		if (req.params.ucId) {
			let result = await Uc.find({ "_id": req.params.ucId });
			res.send(super.wrapperRes(result));
		} else {
			res.send(super.wrapperRes([]));
		}
	}

	@router({
		method: 'patch',
		path: '/api/ucs/:ucId'
	})
	async update(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let ucModel: UcModel = req.body;
		ucModel.setModifiedInfo(user);
		let result = await Uc.update(ucModel);
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'patch',
		path: '/api/ucs/:ucId/script'
	})
	async updateScript(req: e.Request, res: e.Response) {
		try {
			let user: UserModel = super.getUser(req);
			//加载db数据
			let dbUcModels: Array<UcModel> = await Uc.find({ _id: req.params.ucId });
			if (dbUcModels.length != 1) {
				res.send(super.wrapperErrorRes(ErrorCode.UC_NOT_FOUND));
				return;
			}
			let dbUcModel: UcModel = dbUcModels[0];
			let dbProjectModels: Array<ProjectModel> = await Project.find({ _id: dbUcModel.projectId });
			if (dbProjectModels.length != 1) {
				res.send(super.wrapperErrorRes(ErrorCode.PROJECT_NOT_FOUND));
				return;
			}
			let dbProjectModel: ProjectModel = dbProjectModels[0];

			//require脚本
			let fileName = new Date().getTime() + ".js";
			let rootPath = path.join(process.cwd(), "projects");
			let tempFile = path.join(rootPath, dbProjectModel.name, "src", "temp", fileName);
			fs.writeFileSync(tempFile, req.body.code);
			let ucConfig = require(tempFile);
			fs.unlinkSync(tempFile);

			//解析UC
			let ucModel: UcModel = UcHelper.buildModel(ucConfig);
			ucModel.code = req.body.code;
			ucModel._id = req.params.ucId;
			ucModel.groupId = req.body.groupId;
			ucModel.projectId = dbProjectModel._id;
			ucModel.order = dbUcModel.order;
			ucModel.setModifiedInfo(user);
			await Uc.update(ucModel);

			let eachNode = async (nodes: Array<any>, parentId: string) => {
				//解析node
				if (Array.isArray(nodes)) {
					//处理nodes
					for (let i = 0; i < nodes.length; i++) {
						let node: any = nodes[i];
						let nodeModel: NodeModel = NodeHelper.buildModel(node);
						nodeModel.ucId = req.params.ucId;
						nodeModel.projectId = dbProjectModel._id;
						nodeModel.parentId = parentId;
						if (node.children && Array.isArray(ucConfig.children)) {
							nodeModel.isParent = true;
						} else {
							nodeModel.isParent = false;
						}
						nodeModel.setCreatedInfo(user);
						nodeModel = await Node.insert(nodeModel);
						if (node.children && Array.isArray(ucConfig.children)) {
							await eachNode(node.children, nodeModel._id);
						} else {
							//处理paths
							if (Array.isArray(node.paths)) {
								for (let j = 0; j < node.paths.length; j++) {
									let path: any = node.paths[j];
									let pathModel: PathModel = null;
									[pathModel] = PathHelper.buildModel(path.type, path);
									if (!pathModel) {
										throw Error(`path type [${path.type}] undefined`);
									}
									pathModel.projectId = dbProjectModel._id;
									pathModel.nodeId = nodeModel._id;
									pathModel.ucId = req.params.ucId;
									pathModel.setCreatedInfo(user);
									pathModel = await Path.insert(pathModel);
									//处理checker
									if (path.checker) {
										if (Array.isArray(path.checker)) {
										} else {
											let propertyNames: Array<String> = Object.getOwnPropertyNames(path.checker);
											propertyNames.forEach(async (prop: string) => {
												let checkerModel: CheckerModel = null;
												[checkerModel] = CheckHelper.buildModel(prop, path.checker[prop]);
												checkerModel.projectId = dbProjectModel._id;
												checkerModel.ucId = req.params.ucId;
												checkerModel.nodeId = nodeModel._id;
												checkerModel.pathId = pathModel._id;
												checkerModel.setCreatedInfo(user);
												checkerModel = await Checker.insert(checkerModel);
											})
										}
									}
								}
							}
						}
					}
				}
			}
			//清理原先的node
			await Node.remove({ ucId: req.params.ucId });
			await Path.remove({ ucId: req.params.ucId });
			await Checker.remove({ ucId: req.params.ucId });
			// 
			await eachNode(ucConfig.children, null);
			res.send(super.wrapperRes([]));
		} catch (e) {
			res.send(super.wrapperErrorRes(e.message));
		}
	}

	@router({
		method: 'delete',
		path: '/api/ucs/:ucId'
	})
	async delete(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let result = await Uc.delete(req.params.ucId, user._id);
		res.send(super.wrapperRes(result));
	}
}

export default UcController