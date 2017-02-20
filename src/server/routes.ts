import * as express from 'express';
import { RouterMap } from "./decorators/Web";

import ProjectController from "./controllers/ProjectController";
import UcGroupController from "./controllers/UcGroupController";
import UcController from "./controllers/UcController";
import NodeController from "./controllers/NodeController";
new ProjectController();
new UcGroupController();
new UcController();
new NodeController();

export function init(app:any) {
	RouterMap.__DecoratedRouters.forEach((controller: any, config: any) => {
		let controllers = Array.isArray(controller) ? controller : [controller]
		controllers.forEach((controller) => {
			app[config.method](config.path, controller);
		})
	});
}
