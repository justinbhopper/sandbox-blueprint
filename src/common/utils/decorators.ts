
export type AnyFunction = (...args: any[]) => any;
export type MethodWrapper = (originalFn: AnyFunction) => AnyFunction;

const methodDecorator = (wrapper: MethodWrapper, target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
	descriptor.value = wrapper(descriptor.value);
	return descriptor;
}

const propertyDecorator = (wrapper: MethodWrapper, target: any, propertyKey: string | symbol) => {
	let value: any;
	Object.defineProperty(target, propertyKey, {
		configurable: true,
		enumerable: false,
		get() {
			return value;
		},
		set(newValue) {
			value = wrapper(newValue);
			return value;
		}
	});
}

export interface IMethodDecorator {
	<T>(target: any, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<T>): void;
	(target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void;
}

export function wrappedMethodDecorator(wrapper: MethodWrapper): IMethodDecorator {
	return (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void => {
		if (descriptor) {
			methodDecorator(wrapper, target, propertyKey, descriptor);
		} else {
			propertyDecorator(wrapper, target, propertyKey);
		}
	}
}