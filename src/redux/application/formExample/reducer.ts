import { getType } from 'typesafe-actions';
import { FormExampleActions, formExampleActions } from './actions'

export interface IFormExampleState {
	readonly selectedPeople: string[];
}

const initialState: IFormExampleState = {
	selectedPeople: []
};

export const reducer = (state: IFormExampleState = initialState, action: FormExampleActions): IFormExampleState => {
	switch (action.type) {
		case getType(formExampleActions.setSelectedPeople):
			return {
				...state,
				selectedPeople: action.payload
			};

		default:
			return state;
	}
}