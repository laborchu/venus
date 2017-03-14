export class ProjectJsModel {
	_id: string;
	projectId: string;
	fixed: boolean;
	name: string;
	jsName: string;
	script: string;
	requires: Array<string>;
	order: number;
	dataStatus: number;
}