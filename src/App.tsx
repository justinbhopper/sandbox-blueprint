import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import './css/App.css'
import './css/blueprint-overrides.css'

import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components'

import { ErrorBoundary } from "./common/errorHandling"
import MainNavBar from "./scenes/navigation";
import Sandbox from "./scenes/sandbox";

const Main = styled.main`
	padding: 40px;
	padding-top: 80px;

	.bp3-tabs.bp3-vertical > .bp3-tab-panel {
		flex-grow: 1;
	}
`

class App extends React.Component {
	public render() {
		return (
			<ErrorBoundary>
				<MainNavBar />
				<Main>
					<BrowserRouter>
						<Route component={Sandbox} />
					</BrowserRouter>
				</Main>
			</ErrorBoundary>
		);
	}
}

export default App;