import { NodeModel } from './node.model';
export class UcModel {
	_id: string;
	groupId: string;
	title: string;
	ucKey: string;
	sleep: number;
	build: boolean;
	handler: boolean;
	filter: boolean;
	only: boolean;
	dataStatus: number;
	nodes: Array<NodeModel>;
}