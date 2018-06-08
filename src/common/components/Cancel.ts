
export class Cancel {
	public message: string;
	constructor(reason?: any) {
		this.message = '' + (reason || '');
	}
	
	get[Symbol.toStringTag]() {
		if (!this.message) {
			return 'Cancel';
		}
		return `Cancel: ${this.message}`;
	}
}