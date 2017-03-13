import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
let path = require("path");
let fs = require("fs");
let _ = require('lodash');

import {
	Project, UcGroup, Uc, Node, Path, Checker,
	ProjectModel, UcGroupModel, UcModel, NodeModel, PathModel, CheckerModel,
	ProjectHelper, UcGroupHelper, UcHelper, NodeHelper, PathHelper, CheckHelper
} from '../models/index';
import ErrorCode from '../ErrorCode';

let emptyDir = async function(fileUrl: string) {
	let files = fs.readdirSync(fileUrl); //读取该文件夹
	for (let file of files){
		let fullPath = path.join(fileUrl, file);
		let stats = fs.statSync(fullPath);
		if (stats.isDirectory()) {
			emptyDir(fullPath);
			fs.rmdir(fullPath);
		} else {
			fs.unlinkSync(fullPath);
		}
	}
};

class ProjectController extends BaseController {
	@router({
		method: 'get',
		path: '/api/projects'
	})
	async find(req: e.Request, res: e.Response) {
		let result = await Project.find({});
		res.send(super.wrapperRes(result));
	}

	@router({
		method: 'get',
		path: '/api/projects/:projectId/generate'
	})
	async generate(req: e.Request, res: e.Response) {
		if (req.params.projectId) {
			let projectArray = await Project.find({ _id: req.params.projectId });
			if (projectArray.length == 0) {
				res.send(super.wrapperErrorRes(ErrorCode.PROJECT_NOT_FOUND));
				return;
			}
			/**********获取项目信息 Start**********/
			let project: ProjectModel = projectArray[0];
			project = ProjectHelper.buildModel(project);
			let ucGroupArray: Array<UcGroupModel> = await UcGroup.find({ projectId: project._id });

			let ucGroups: Array<UcGroupModel> = [];
			for (let ucGroupModel of ucGroupArray) {//UcGroup
				ucGroupModel = UcGroupHelper.buildModel(ucGroupModel);
				ucGroups.push(ucGroupModel);

				let ucArray: Array<UcModel> = await Uc.find({ "groupId": ucGroupModel._id });
				let ucs: Array<UcModel> = [];
				for (let ucModel of ucArray) {//Uc
					ucModel = UcHelper.buildModel(ucModel);
					ucs.push(ucModel);

					let nodeArray: Array<NodeModel> = await Node.find({ "ucId": ucModel._id });
					let nodes: Array<NodeModel> = [];
					for (let nodeModel of nodeArray) {//Node
						nodeModel = NodeHelper.buildModel(nodeModel);
						nodes.push(nodeModel);

						let pathArray: Array<PathModel> = await Path.find({ "nodeId": nodeModel._id });
						let paths: Array<PathModel> = [];
						for (let pathModel of pathArray) {//path
							[pathModel] = PathHelper.buildModel(pathModel.type, pathModel);
							paths.push(pathModel);

							let checkerArray: Array<CheckerModel> = await Checker.find({ "pathId": pathModel._id });
							let checkers: Array<CheckerModel> = [];
							for (let checker of checkerArray) {//checker
								[checker] = CheckHelper.buildModel(checker.type, checker);
								checkers.push(checker);
							}
							pathModel.checker = checkers;
						}
						nodeModel.paths = paths;
					}
					ucModel.nodes = nodes;
				}
				ucGroupModel.ucs = ucs;
			}
			project.ucGroups = ucGroups;
			/**********获取项目信息 End**********/


			/**********产生项目文件 Start**********/
			let rootPath = path.join(process.cwd(), "projects");
			if (!fs.existsSync(rootPath)) {
				fs.mkdirSync(rootPath);
			}
			//初始化文件夹
			let projectPath = path.join(rootPath, project.name);
			let projectSrc = path.join(projectPath, "src");
			let ucPath = path.join(projectSrc, "uc");
			let handlerPath = path.join(projectSrc, "handler");
			if (fs.existsSync(projectPath)) {
				await emptyDir(projectPath);
			}else{
				fs.mkdirSync(projectPath);
			}
			fs.mkdirSync(projectSrc);
			fs.mkdirSync(ucPath);
			fs.mkdirSync(handlerPath);

			let packageTpl = _.template(fs.readFileSync(path.join(rootPath, "package.tpl.json")));
			fs.writeFileSync(path.join(projectPath, "package.json"), packageTpl({
				"name": project.name
			}));
			for (let ucGroup of project.ucGroups){
				let groupPath = path.join(ucPath, ucGroup.name);
				fs.mkdirSync(groupPath);
				for (let uc of ucGroup.ucs){
					delete uc.code;
					let ucTpl = _.template(fs.readFileSync(path.join(rootPath, "uc.tpl.js")));
					fs.writeFileSync(path.join(groupPath, `${uc.ucKey}.js`), ucTpl({
						"content": JSON.stringify(uc).replace(/\\n/g, "").replace(/\\/g, "")
					}));
				}
				
			}

			/**********产生项目文件 End**********/
			res.send(super.wrapperRes([]));
		} else {
			res.send(super.wrapperRes([]));
		}

	}

	@router({
		method: 'post',
		path: '/api/projects'
	})
	async create(req: e.Request, res: e.Response) {
		let result = await Project.insert(req.body);
		res.send(super.wrapperRes(result));
	}
}

export default ProjectController