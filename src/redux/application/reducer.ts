import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { RootAction } from '..';
import { ApplicationActions } from './actions'

export interface IApplicationState 
{
	readonly selectedPeople: string[];
}

export const reducer = combineReducers<IApplicationState, RootAction>({
	selectedPeople: (selectedPeople: string[], action: RootAction) => {
		switch (action.type) {
			case getType(ApplicationActions.setSelectedPeople):
				return action.payload;

			default:
				return selectedPeople;
		}
	}
});