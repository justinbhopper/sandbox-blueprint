import { applyMiddleware, compose, createStore } from 'redux';
import DevTools from './containers/DevTools';
import { IRootState } from './redux';
import { rootReducer } from './redux/root-reducer';

function configureStore(initialState?: IRootState) {
	const enhancer = compose(
		applyMiddleware(),
		DevTools.instrument()
	);

	return createStore(rootReducer, initialState!, enhancer);
}

export default configureStore({
	application: {
		count: 2
	},
	formExample: {
		selectedPeople: ["Justin"]
	}
});