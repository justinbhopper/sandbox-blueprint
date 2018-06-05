import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const getRedirectConfirmation = (message: string, callback: (ok: boolean) => void) => {
	const allowTransition = window.confirm(message)
	callback(allowTransition)
}

ReactDOM.render(
	<BrowserRouter getUserConfirmation={getRedirectConfirmation}>
		<Route component={App} />
	</BrowserRouter>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
