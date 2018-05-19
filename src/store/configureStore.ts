import { compose, createStore } from 'redux';
import DevTools from '../containers/DevTools';
import { IRootState } from '../redux';
import { rootReducer } from '../redux/root-reducer';

const enhancer = compose(
	DevTools.instrument()
);

export default function configureStore(initialState: IRootState) {
	const cs: any = createStore;
	return cs(rootReducer, initialState, enhancer);
}