import { createAction } from 'typesafe-actions';

export const applicationActions = {
	setSelectedPeople: createAction('SET_SELECTED_PEOPLE', resolve => {
		return ( selectedPeople: string[]) => resolve(selectedPeople)
	})
};