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
	TabId,
	Tabs,
	Tooltip
} from '@blueprintjs/core';

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

class App extends React.Component {
	public render() {
		const contentMenu = (
			<Menu>
				<MenuItem text="Application Preferences" />
				<MenuItem text="Layout Options" />
				<MenuItem text="Scheduler" />
			</Menu>
		);

		const defaultSelectedTabId = (location.hash || "fields").replace('#', '');

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
					<Tabs id="areas" defaultSelectedTabId={defaultSelectedTabId} large={true} vertical={true} onChange={this.onTabChange}>
						<Tab id="fields" title="Form Fields" panel={<Card><FormFieldsView /></Card>} />
						<Tab id="selectboxes" title="Selects" panel={<Card><SelectsView /></Card>}/>
						<Tab id="buttons" title="Buttons" panel={<Card><ButtonsView /></Card>} />
						<Tab id="notifications" title="Notifications" panel={<Card><NotificationsView /></Card>} />
						<Tab id="popups" title="Popups" panel={<Card><PopupsView /></Card>} />
						<Tab id="callouts" title="Callouts" panel={<Card><CalloutsView /></Card>} />
						<Tab id="empty" title="Empty Results" panel={<Card><EmptyView /></Card>} />
					</Tabs>
				</main>
			</>
		);
	}

	private onTabChange = (newTabId: TabId) => {
		history.pushState(null, undefined, `#${newTabId}`);
	}
}

export default App;
