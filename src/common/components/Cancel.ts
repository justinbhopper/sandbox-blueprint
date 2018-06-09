
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

// non-standard, taken from domenic's suggestion at
// https://github.com/tc39/proposal-cancelable-promises/issues/32#issuecomment-235644656
export function isCancel(value: any): value is Cancel {
	if (!value) {
		return false;
	}
	if (!value.constructor) {
		return false;
	}
	return value.constructor.name === 'Cancel';
}