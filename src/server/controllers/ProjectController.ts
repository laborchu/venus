import e = require('express');
import BaseController from "./BaseController";
import { router } from "../decorators/Web";
let path = require("path");
let fs = require("fs");
let _ = require('lodash');

import {
	Project, UcGroup, Uc, Node, Path, Checker, ProjectJs, UserModel,
	ProjectModel, ProjectJsModel, UcGroupModel, UcModel, NodeModel, PathModel, CheckerModel,
	ProjectHelper, UcGroupHelper, UcHelper, NodeHelper, PathHelper, CheckHelper
} from '../models/index';
import ErrorCode from '../ErrorCode';

let emptyDir = async function(fileUrl: string) {
	let files = fs.readdirSync(fileUrl); //读取该文件夹
	for (let file of files){
		let fullPath = path.join(fileUrl, file);
		let stats = fs.statSync(fullPath);
		if (stats.isDirectory()) {
			await emptyDir(fullPath);
			fs.rmdir(fullPath);
		} else {
			fs.unlinkSync(fullPath);
		}
	}
};

let copyFile = function(src: string, dist: string) {
	if (!fs.existsSync(dist)) {
		var sourceFile = path.join(src);
		var readStream = fs.createReadStream(sourceFile);
		var writeStream = fs.createWriteStream(dist, { mode: 0o777 });
		readStream.pipe(writeStream);
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
			[project] = ProjectHelper.buildModel(project.platform,project);
			let ucGroupArray: Array<UcGroupModel> = await UcGroup.find({ projectId: project._id });
			let filterField = { "_id": true, "groupId": true, "dataStatus": true, "order": true, "ucId": true, "nodeId": true, "pathId": true };
			let ucGroups: Array<UcGroupModel> = [];
			for (let ucGroupModel of ucGroupArray) {//UcGroup
				ucGroupModel = UcGroupHelper.buildModel(ucGroupModel);
				ucGroups.push(ucGroupModel);

				let ucArray: Array<UcModel> = await Uc.find({ "groupId": ucGroupModel._id });
				let ucs: Array<UcModel> = [];
				for (let ucModel of ucArray) {//Uc
					let nodeArray: Array<NodeModel> = await Node.find({ "ucId": ucModel._id });
					let nodes: Array<NodeModel> = [];
					for (let nodeModel of nodeArray) {//Node
						let pathArray: Array<PathModel> = await Path.find({ "nodeId": nodeModel._id });
						let paths: Array<PathModel> = [];
						for (let pathModel of pathArray) {//path
							let checkerArray: Array<CheckerModel> = await Checker.find({ "pathId": pathModel._id });
							let checkers: Array<CheckerModel> = [];
							for (let checker of checkerArray) {//checker
								[checker] = CheckHelper.buildModel(checker.type, checker, true,filterField);
								checkers.push(checker);
							}
							[pathModel] = PathHelper.buildModel(pathModel.type, pathModel, true, filterField);
							if (checkers.length>0){
								pathModel.checker = checkers;
							}else{
								delete pathModel.checker;
							}
							paths.push(pathModel);
						}
						nodeModel = NodeHelper.buildModel(nodeModel, true, filterField);
						nodes.push(nodeModel);
						nodeModel.paths = paths;
					}
					ucModel = UcHelper.buildModel(ucModel, true, filterField);
					ucs.push(ucModel);
					ucModel.nodes = nodes;
				}
				ucGroupModel.ucs = ucs;
			}
			project.ucGroups = ucGroups;
			/**********获取项目信息 End**********/


			/**********产生项目文件 Start**********/
			let rootPath = path.join(process.cwd(), "projects");
			let projectPath = path.join(rootPath, project.name);
			let projectSrc = path.join(projectPath, "src");
			let ucPath = path.join(projectSrc, "uc");
			let handlerPath = path.join(projectSrc, "handler");
			
			await emptyDir(ucPath);
			await emptyDir(handlerPath);

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
					fs.writeFileSync(path.join(groupPath, `${uc.ucKey}.uc.js`), ucTpl({
						"content": JSON.stringify(uc).replace(/\\n/g, "").replace(/\\/g, "")
					}));
				}
			}

			//产生全局脚本
			let projectJsArray = await ProjectJs.find({ projectId: project._id });
			for (let projectJs of projectJsArray) {
				fs.writeFileSync(path.join(projectSrc, `${projectJs.jsName}.js`), projectJs.script);
			}
			delete project.ucGroups;
			delete project._id;
			delete project.name;
			fs.writeFileSync(path.join(projectPath, `vtester.json`), JSON.stringify(project));

			//复制文件
			copyFile(path.join(rootPath, "vtester.uc.tpl.js"), path.join(projectSrc, "vtester.uc.js"));
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
		let user:  UserModel = super.getUser(req);
		let project: ProjectModel = await Project.insert(req.body, user._id);
		let jsModel: ProjectJsModel = new ProjectJsModel();
		jsModel.name = "页面映射";
		jsModel.jsName = "page.map";
		jsModel.fixed = true;
		jsModel.projectId = project._id;
		jsModel.dataStatus = 1;
		ProjectJs.insert(jsModel,user._id);
		jsModel.name = "全局参数";
		jsModel.jsName = "global.uc";
		ProjectJs.insert(jsModel, user._id);
		jsModel.name = "工具脚本";
		jsModel.jsName = "helper.uc";
		ProjectJs.insert(jsModel, user._id);

		//初始化文件夹
		let rootPath = path.join(process.cwd(), "projects");
		if (!fs.existsSync(rootPath)) {
			fs.mkdirSync(rootPath);
		}
		let projectPath = path.join(rootPath, project.name);
		if (!fs.existsSync(projectPath)) {
			fs.mkdirSync(projectPath);
			fs.mkdirSync(path.join(projectPath, "src"));
			fs.mkdirSync(path.join(projectPath, "uc"));
			fs.mkdirSync(path.join(projectPath, "handler"));
			fs.mkdirSync(path.join(projectPath, "temp"));
		}

		res.send(super.wrapperRes(project));
	}

	@router({
		method: 'patch',
		path: '/api/projects/:id'
	})
	async update(req: e.Request, res: e.Response) {
		let user: UserModel = super.getUser(req);
		let result = await Project.update(req.body, user._id);
		res.send(super.wrapperRes(result));
	}
}

export default ProjectController