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
	Elevation,
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

import { ButtonsView } from "./areas/ButtonsView";
import { CalloutsView } from "./areas/CalloutsView";
import { EmptyView } from "./areas/EmptyView";
import { FormFieldsView } from "./areas/FormFieldsView";
import { NotificationsView } from "./areas/NotificationsView";
import { SelectsView } from "./areas/SelectsView";

FormGroup.DEFAULT_REQUIRED_CONTENT = (
	<span className="required-label">
		{FormGroup.DEFAULT_REQUIRED_CONTENT}
	</span>
);

class App extends React.Component {
	public render() {
		const contentMenu = (
			<Menu>
				<MenuItem text="Application Preferences" />
				<MenuItem text="Layout Options" />
				<MenuItem text="Scheduler" />
			</Menu>
		);

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
					<Card elevation={Elevation.ONE}>
						<Tabs id="areas" defaultSelectedTabId="fields" large={true}>
							<Tab id="fields" title="Form Fields" panel={<FormFieldsView />} />
							<Tab id="selectboxes" title="Selects" panel={<SelectsView />}/>
							<Tab id="buttons" title="Buttons" panel={<ButtonsView />} />
							<Tab id="datePicker" title="Date Pickers" />
							<Tab id="notifications" title="Notifications" panel={<NotificationsView />} />
							<Tab id="callouts" title="Callouts" panel={<CalloutsView />} />
							<Tab id="empty" title="Empty Results" panel={<EmptyView />} />
						</Tabs>
					</Card>
				</main>
			</>
		);
	}
}

export default App;
