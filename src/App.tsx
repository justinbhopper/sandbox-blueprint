import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import * as React from 'react';
import './App.css'
import { FormExample } from "./examples/formExample";

import {
	Alignment,
	Button,
	ButtonGroup,
	Card,
	Elevation,
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
						<Tabs id="tabs" selectedTabId="search" large={true}>
							<Tab id="search" title="Search Medications" panel={<FormExample />} />
							<Tab id="details" title="Enter Details" />
							<Tab id="send" title="Review / Send" />
						</Tabs>
					</Card>
				</main>
			</>
		);
	}
}

export default App;
