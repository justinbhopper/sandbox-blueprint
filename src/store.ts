import { applyMiddleware, compose, createStore } from 'redux';
import DevTools from './containers/DevTools';
import { IRootState } from './redux';
import { rootReducer } from './redux/root-reducer';

function configureStore(initialState?: IRootState) {
	const middleware = applyMiddleware();

	const enhancer = compose(
		middleware,
		DevTools.instrument()
	);

	return createStore(rootReducer, initialState!, enhancer);
}

const store = configureStore();

export default store;