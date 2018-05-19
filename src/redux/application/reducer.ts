import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { RootAction } from '..';
import { applicationActions } from './actions'

export interface IApplicationState 
{
	readonly selectedPeople: string[];
}

export const reducer = combineReducers<IApplicationState, RootAction>({
	selectedPeople: (selectedPeople: string[] = [], action: RootAction) => {
		switch (action.type) {
			case getType(applicationActions.setSelectedPeople):
				return action.payload;

			default:
				return selectedPeople;
		}
	}
});