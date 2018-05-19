import { ActionType, createAction } from 'typesafe-actions';

export const formExampleActions = {
	setSelectedPeople: createAction('SET_SELECTED_PEOPLE', resolve => {
		return ( selectedPeople: string[]) => resolve(selectedPeople)
	})
};

export type FormExampleActions = ActionType<typeof formExampleActions>;