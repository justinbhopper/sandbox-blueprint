export interface IAction<T extends string> {
	type: T
}

export interface IActionWithPayload<T extends string, TPayload> extends IAction<T> {
	payload: TPayload
}

export function createAction<T extends string>(type: T): IAction<T>
export function createAction<T extends string, TPayload>(type: T, payload: TPayload): IActionWithPayload<T, TPayload>
export function createAction<T extends string, TPayload>(type: T, payload?: TPayload) {
	return payload === undefined ? { type } : { type, payload }
}

type FunctionType = (...args: any[]) => any
interface IActionCreatorsMapObject { 
	[actionCreator: string]: FunctionType 
}

export type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<A[keyof A]>