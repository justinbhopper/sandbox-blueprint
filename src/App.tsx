import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import './css/App.css'
import './css/blueprint-overrides.css'

import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { FormGroup } from '@blueprintjs/core';

import { ErrorBoundary } from "common/errorHandling";
import MainNavBar from "scenes/navigation";
import Sandbox from "scenes/sandbox";

FormGroup.DEFAULT_REQUIRED_CONTENT = (
	<span className="required-label">
		{FormGroup.DEFAULT_REQUIRED_CONTENT}
	</span>
);

class App extends React.Component {
	public render() {
		return (
			<ErrorBoundary>
				<MainNavBar />
				<main>
					<BrowserRouter>
						<Route component={Sandbox} />
					</BrowserRouter>
				</main>
			</ErrorBoundary>
		);
	}
}

export default App;