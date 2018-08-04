import * as React from 'react';

import {
	Card,
	Tab,
	Tabs
} from '@blueprintjs/core';

import { Link } from 'react-router-dom'

import Buttons from "./examples/Buttons";
import Callouts from "./examples/Callouts";
import EmptyResults from "./examples/EmptyResults";
import FormFields from "./examples/FormFields";
import Notifications from "./examples/Notifications";
import Popups from "./examples/Popups";
import Selects from "./examples/Selects";

function renderTab(tab: ISandboxTab) {
	return (
		<Tab key={tab.id + 'Tab'} id={tab.id} panel={<Card>{tab.view()}</Card>}>
			<Link to={`/${tab.id}`} replace={true}>{tab.label}</Link>
		</Tab>
	);
}

interface ISandboxTab {
	id: string;
	label: string;
	view: () => JSX.Element;
}

interface ISandboxProps {
	location: Location;
}

export class Sandbox extends React.Component<ISandboxProps> {
	public render() {
		const { location } = this.props;

		const tabs: ISandboxTab[] = [
			{ id: 'fields', label: 'Fields', view: () => <FormFields /> },
			{ id: 'selects', label: 'Selects', view: () => <Selects /> },
			{ id: 'buttons', label: 'Buttons', view: () => <Buttons /> },
			{ id: 'notifications', label: 'Notifications', view: () => <Notifications /> },
			{ id: 'popups', label: 'Popups', view: () => <Popups /> },
			{ id: 'callouts', label: 'Callouts', view: () => <Callouts /> },
			{ id: 'empty', label: 'Empty Results', view: () => <EmptyResults /> }
		]

		let defaultSelectedTabId = 'fields';

		const locationPath = location.pathname.replace('/', '');
		if (tabs.some(t => t.id === locationPath)) {
			defaultSelectedTabId = locationPath;
		}

		return (
			<Tabs id="areas" defaultSelectedTabId={defaultSelectedTabId} large={true} vertical={true} renderActiveTabPanelOnly={true}>
				{tabs.map(t => renderTab(t))}
			</Tabs>
		);
	}
}

export default Sandbox;
