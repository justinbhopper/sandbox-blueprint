import { Cancel, isCancel } from "./Cancel";

export type CancelFunction = (reason?: any) => void;

// Taken from https://github.com/PolymerLabs/cancel-token/

/**
 * A polyfill for the November 23rd, 2016 draft of
 * https://tc39.github.io/proposal-cancelable-promises/
 */
export class CancelToken {
	public static never = new CancelToken(() => null);

	public static source() {
		let cancel: CancelFunction = null as any;
		const token = new CancelToken((c) => {
			cancel = c;
		});
		return { token, cancel };
	}

	public static race(...tokens: CancelToken[]): CancelToken {
		// TODO(rictic): This may not be right according to spec. The timing might
		//     be off and cancellation may need to happen synchronously?
		let cancel: CancelFunction;
		let token = new CancelToken((c) => cancel = c);
		for (token of tokens) {
			if (!isCancelToken(token)) {
				throw new TypeError('CancelToken.race must be called with an iterable of CancelTokens');
			}

			token.promise.then((cancellation) => {
				cancel(cancellation && cancellation.message || cancellation);
			});
		}

		return token;
	}

	public promise: Promise<Cancel>;
	public reason: Cancel | undefined = undefined;

	constructor(executor: (cancel: CancelFunction) => void) {
		let resolve: CancelFunction;
		this.promise = new Promise<Cancel>((res) => resolve = res);

		const cancel = (reason?: any) => {
			if (this.reason) {
				return;
			}
			// TODO(rictic): file a bug about this. This isn't up to spec, but without
			// this every canceltoken composition system (like .race()) will add
			// another layer of Cancel().
			this.reason = isCancel(reason) ? reason : new Cancel(reason);
			resolve(this.reason);
		};
		executor(cancel);
	}

	public throwIfRequested() {
		if (this.reason) {
			throw this.reason;
		}
	}

	get[Symbol.toStringTag]() {
		return 'CancelToken';
	}
}

export function isCancelToken(value: any): value is CancelToken {
	if (!value) {
		return false;
	}
	if (!value.constructor) {
		return false;
	}
	return value.constructor.name === 'CancelToken';
}

function createIgnoredMethod(originalFn: (...args: any[]) => any) {
	function handleError(err: any) {
		if (!isCancel(err)) {
			throw err;
		}
	}
	
	return function (this: any, ...args: any[]) {
		try {
			const result = originalFn.apply(this, args);
			if (result instanceof Promise) { 
				return result.catch((err) => handleError(err)); 
			} 
			return result; 
		} catch (err) {
			return handleError(err);
		}
	}
}

const ignoreCancelMethodDecorator: MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
	descriptor.value = createIgnoredMethod(descriptor.value);
	return descriptor;
}

const ignoreCancelPropertyDecorator: PropertyDecorator = (target: any, propertyKey: string | symbol) => {
	let value: any;
	Object.defineProperty(target, propertyKey, {
		configurable: true,
		enumerable: false,
		get() {
			return value;
		},
		set(newValue) {
			value = createIgnoredMethod(newValue);
			return value;
		}
	});
}

export interface IgnoreCancelDecorator {
	<T>(target: any, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<T>): void;
	(target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void;
} 

export const ignoreCancel: IgnoreCancelDecorator = (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
	if (descriptor) {
		ignoreCancelMethodDecorator(target, propertyKey, descriptor);
	} else {
		ignoreCancelPropertyDecorator(target, propertyKey);
	}
}

// TODO(rictic): handle unhandledRejections of Cancels according to each
//     platform's folkways.
process.on('unhandledRejection', (reason: any, p: Promise<any>) => {
	if (isCancel(reason)) {
		p.catch(() => {/*do nothing but let node know this is ok */});
	}
});

export { Cancel, isCancel }