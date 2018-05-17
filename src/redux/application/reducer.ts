import { AnyAction, combineReducers } from 'redux';

export interface IApplicationState 
{
	readonly selectedPeople: string[];
}

export const reducer = combineReducers({
	selectedPeople: (state: IApplicationState, action: AnyAction) => {
		switch (action.type)
		{
			case 'SET_SELECTED_PEOPLE':
				return {
					...state,
					selectedPeople: action.payload
				};

			default:
				return state;
		}
	}
});