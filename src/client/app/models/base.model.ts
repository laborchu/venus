export namespace BaseHelper {
	export function has(value:any): boolean {
		return value!=undefined&&value!=null;
	}
}


export class BaseModel{
	dataStatus: number = 1;
	order: number = null;
	createdBy: string = null;
	createdDate: Date = null;
	modifiedBy: string = null;
	modifiedDate: Date = null;
}