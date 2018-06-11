import * as React from 'react';

import { observer } from "mobx-react";

import {
	Alignment,
	Button,
	ButtonGroup,
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
	Tooltip
} from '@blueprintjs/core';

import Notification from 'common/components/Notification'

@observer
class MainNavBar extends React.Component {
	public render() {
		const contentMenu = (
			<Menu>
				<MenuItem text="Application Preferences" />
				<MenuItem text="Layout Options" />
				<MenuItem text="Scheduler" />
			</Menu>
		);

		const notificationsLabel = `Notifications ${Notification.silenced ? "Silenced" : "Enabled"}`;

		return (
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
						<Tooltip content={notificationsLabel} position={Position.BOTTOM}>
							<Button minimal={true} style={{opacity: Notification.silenced ? 0.5 : 1}} 
								icon="notifications" onClick={this.toggleNotifications} />
						</Tooltip>
					</ButtonGroup>
					<NavbarDivider />
					<Tooltip content="Log Out" position={Position.BOTTOM} intent={Intent.DANGER}>
						<Button minimal={true} large={true} icon="log-out" intent={Intent.DANGER} />
					</Tooltip>
				</NavbarGroup>
			</Navbar>
		);
	}

	private toggleNotifications = () => {
		if (Notification.silenced)
			Notification.unsilence();
		else
			Notification.silence();
	}
}

export default MainNavBar;
