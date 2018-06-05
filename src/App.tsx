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

function renderTab(id: string, label: string, view: JSX.Element) {
	return (
		<Tab id={id} panel={<Card>{view}</Card>}>
			<Link to={`/${id}`}>{label}</Link>
		</Tab>
	);
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

		let defaultSelectedTabId = '/fields';
		switch (location.pathname) {
			case '/fields':
			case '/selects':
			case '/buttons':
			case '/notifications':
			case '/popups':
			case '/callouts':
			case '/empty':
				defaultSelectedTabId = location.pathname.substring(1);
				break;
		}

		return (
			<>
				<Navbar fixedToTop={true}>
					<NavbarGroup>
						<NavbarHeading>Test App</NavbarHeading>
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
						{renderTab('fields', 'Form Fields', <FormFieldsView />)}
						<Tab id="selects" panel={<Card><SelectsView /></Card>}>
							<Link to="/selects">Selects</Link>
						</Tab>
						<Tab id="buttons" panel={<Card><ButtonsView /></Card>}>
							<Link to="/buttons">Buttons</Link>
						</Tab>
						<Tab id="notifications" panel={<Card><NotificationsView /></Card>}>
							<Link to="/notifications">Notifications</Link>
						</Tab>
						<Tab id="popups" panel={<Card><PopupsView /></Card>}>
							<Link to="/popups">Popups</Link>
						</Tab>
						<Tab id="callouts" panel={<Card><CalloutsView /></Card>}>
							<Link to="/callouts">Callouts</Link>
						</Tab>
						<Tab id="empty" panel={<Card><EmptyView /></Card>}>
							<Link to="/empty">Empty Results</Link>
						</Tab>
					</Tabs>
				</main>
			</>
		);
	}
}

export default App;
