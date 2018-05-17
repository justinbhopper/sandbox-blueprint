import { AnyAction, combineReducers } from "redux";
import { IApplicationState } from "./application";
import { RootAction } from './root-action'

import { reducer as application } from './application'

export interface IRootState {
	application: IApplicationState;
}

export const rootReducer = combineReducers<IRootState>({
	application
});