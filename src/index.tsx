import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from "./containers/DevTools";
import './index.css';
import { IRootState } from './redux'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const initialState: IRootState = {
	application: {
		selectedPeople: []
	}
}

const store = configureStore(initialState)

ReactDOM.render(
	<Provider store={store}>
		<div>
			<App />
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
