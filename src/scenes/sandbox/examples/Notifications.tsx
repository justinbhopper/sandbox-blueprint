import { observer } from 'mobx-react';
import * as React from 'react';

import { Notification } from '../../../common/components/Notification'
import { IntentSelect } from '../components/IntentSelect';

import {
	Button,
	Intent,
	Label,
	Switch
} from '@blueprintjs/core';

let notificationCount = 0;

export interface INotifications {
	intent: Intent;
}

@observer
export class Notifications extends React.Component<{}, INotifications> {
	public state: INotifications = {
		intent: Intent.NONE
	}

	public render() {
		return (
			<>
				<div className="example stack">
					<Button large={true} icon="notifications" onClick={this.showNotification}>Repeatedly click here!</Button> 
				</div>
				<div className="example stack">
					<Switch checked={Notification.silenced} onClick={this.toggleSilenced}>Notifications Silenced</Switch>
				</div>
				<div className="example stack">
					<Label text="Color">
						<IntentSelect intent={this.state.intent} onChange={this.handleIntentChange} />
					</Label>
				</div>
			</>
		);
	}

	private handleIntentChange = (intent: Intent) => this.setState({ intent });

	private toggleSilenced = () => {
		if (Notification.silenced) {
			Notification.unsilence();
		} else {
			Notification.silence();
		}
	}

	private showNotification = () => {
		Notification.show({ 
			action: {
				text: "Retry"
			},
			icon: this.state.intent === Intent.DANGER ? "warning-sign" : "info-sign",
			intent: this.state.intent,
			message: (
				<>
					This is notification {notificationCount++}
				</>
			)
		})
	}
}

export default Notifications;