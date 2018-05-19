import { combineReducers } from "redux";
import { IApplicationState, reducer as applicationReducer } from "./application";
import { IFormExampleState, reducer as formExampleReducer } from "./application/formExample";
import { RootAction } from './root-action'

export interface IRootState {
	application: IApplicationState;
	formExample: IFormExampleState;
}

export const rootReducer = combineReducers<IRootState, RootAction>({
	application: applicationReducer,
	formExample: formExampleReducer
});