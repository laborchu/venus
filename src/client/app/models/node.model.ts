import { PathModel } from './path.model';
export class NodeModel {
	_id: string;
	ucId: string;
	title: string;
	dataStatus: number;
	paths: Array<PathModel>;
}