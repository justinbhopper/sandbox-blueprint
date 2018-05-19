import { ApplicationActions } from './actions'

export interface IApplicationState {
	count: number;
}

const initialState: IApplicationState = {
	count: 5
};

export const reducer = (state: IApplicationState = initialState, action: ApplicationActions): IApplicationState => {
	return state;
};