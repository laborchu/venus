import * as express from 'express';
import { RouterMap } from "./decorators/Web";

import ProjectController from "./controllers/ProjectController";
import ProjectJsController from "./controllers/ProjectJsController";
import UcGroupController from "./controllers/UcGroupController";
import UcController from "./controllers/UcController";
import NodeController from "./controllers/NodeController";
import PathController from "./controllers/PathController";
import SessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";

new ProjectController();
new ProjectJsController();
new UcGroupController();
new UcController();
new NodeController();
new PathController();
new SessionController();
new UserController();


export function init(app:any) {
	RouterMap.__DecoratedRouters.forEach((controller: any, config: any) => {
		let controllers = Array.isArray(controller) ? controller : [controller]
		controllers.forEach((controller) => {
			app[config.method](config.path, controller);
		})
	});
}
