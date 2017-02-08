import * as express from 'express';
import { RouterMap } from "./decorators/Web";

import ProjectController from "./controllers/ProjectController";
import UcGroupController from "./controllers/UcGroupController";
new ProjectController();
new UcGroupController();

export function init(app:any) {
	RouterMap.__DecoratedRouters.forEach((controller: any, config: any) => {
		let controllers = Array.isArray(controller) ? controller : [controller]
		controllers.forEach((controller) => {
			app[config.method](config.path, controller);
		})
	});
}
