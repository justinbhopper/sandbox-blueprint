import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import * as React from 'react';
import './css/App.css'
import './css/blueprint-overrides.css'

import {
	Alignment,
	Button,
	ButtonGroup,
	Card,
	FormGroup,
	Intent,
	Menu,
	MenuItem,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
	Popover,
	PopoverInteractionKind,
	Position,
	Tab,
	Tabs,
	Tooltip
} from '@blueprintjs/core';

import { Link } from 'react-router-dom'

import { ButtonsView } from "./areas/ButtonsView";
import { CalloutsView } from "./areas/CalloutsView";
import { EmptyView } from "./areas/EmptyView";
import { FormFieldsView } from "./areas/FormFieldsView";
import { NotificationsView } from "./areas/NotificationsView";
import { PopupsView } from "./areas/PopupsView";
import { SelectsView } from "./areas/SelectsView";

FormGroup.DEFAULT_REQUIRED_CONTENT = (
	<span className="required-label">
		{FormGroup.DEFAULT_REQUIRED_CONTENT}
	</span>
);

function renderTab(tab: IAppTab) {
	return (
		<Tab key={tab.id + 'Tab'} id={tab.id} panel={<Card>{tab.view()}</Card>}>
			<Link to={`/${tab.id}`} replace={true}>{tab.label}</Link>
		</Tab>
	);
}

interface IAppTab {
	id: string;
	label: string;
	view: () => JSX.Element;
}

interface IAppProps {
	location: Location;
}

class App extends React.Component<IAppProps> {
	public render() {
		const contentMenu = (
			<Menu>
				<MenuItem text="Application Preferences" />
				<MenuItem text="Layout Options" />
				<MenuItem text="Scheduler" />
			</Menu>
		);

		const { location } = this.props;

		const tabs: IAppTab[] = [
			{ id: 'fields', label: 'Fields', view: () => <FormFieldsView /> },
			{ id: 'selects', label: 'Selects', view: () => <SelectsView /> },
			{ id: 'buttons', label: 'Buttons', view: () => <ButtonsView /> },
			{ id: 'notifications', label: 'Notifications', view: () => <NotificationsView /> },
			{ id: 'popups', label: 'Popups', view: () => <PopupsView /> },
			{ id: 'callouts', label: 'Callouts', view: () => <CalloutsView /> },
			{ id: 'empty', label: 'Empty Results', view: () => <EmptyView /> }
		]

		let defaultSelectedTabId = 'fields';

		const locationPath = location.pathname.replace('/', '');
		if (tabs.some(t => t.id === locationPath)) {
			defaultSelectedTabId = locationPath;
		}

		return (
			<>
				<Navbar fixedToTop={true}>
					<NavbarGroup>
						<NavbarHeading>Sandbox</NavbarHeading>
					</NavbarGroup>
					<NavbarGroup align={Alignment.RIGHT}>
						<Button minimal={true} icon="home" text="Home" />
						<NavbarDivider />
						<ButtonGroup minimal={true} large={true}>
							<Tooltip content="User Profile" position={Position.BOTTOM}>
								<Button icon="user" />
							</Tooltip>
							<Popover content={contentMenu} interactionKind={PopoverInteractionKind.HOVER} position={Position.BOTTOM_RIGHT}>
								<Button minimal={true} icon="cog" />
							</Popover>
						</ButtonGroup>
						<NavbarDivider />
						<Tooltip content="Log Out" position={Position.BOTTOM} intent={Intent.DANGER}>
							<Button minimal={true} large={true} icon="log-out" intent={Intent.DANGER} />
						</Tooltip>
					</NavbarGroup>
				</Navbar>
				<main>
					<Tabs id="areas" defaultSelectedTabId={defaultSelectedTabId} large={true} vertical={true}>
						{tabs.map(t => renderTab(t))}
					</Tabs>
				</main>
			</>
		);
	}
}

export default App;
