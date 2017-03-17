import * as express from 'express';
import { RouterMap } from "./decorators/Web";

import ProjectController from "./controllers/ProjectController";
import ProjectJsController from "./controllers/ProjectJsController";
import UcGroupController from "./controllers/UcGroupController";
import UcController from "./controllers/UcController";
import NodeController from "./controllers/NodeController";
import PathController from "./controllers/PathController";
import SessionController from "./controllers/SessionController";
<<<<<<< HEAD
import UserController from "./controllers/UserController";

=======
import CheckerController from "./controllers/CheckerController";
>>>>>>> 143c001cf87f384da574c866bbf25aa14c6644a7
new ProjectController();
new ProjectJsController();
new UcGroupController();
new UcController();
new NodeController();
new PathController();
new SessionController();
<<<<<<< HEAD
new UserController();

=======
new CheckerController();
>>>>>>> 143c001cf87f384da574c866bbf25aa14c6644a7

export function init(app:any) {
	RouterMap.__DecoratedRouters.forEach((controller: any, config: any) => {
		let controllers = Array.isArray(controller) ? controller : [controller]
		controllers.forEach((controller) => {
			app[config.method](config.path, controller);
		})
	});
}
