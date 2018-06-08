import { observer } from 'mobx-react';
import * as React from 'react';

import { Notification } from '../../../common/components/Notification'
import { IntentSelect } from '../components/IntentSelect';

import {
	Button,
	Icon,
	Intent,
	Label,
	Switch
} from '@blueprintjs/core';
import BeforeUnload from 'common/components/BeforeUnload';

let notificationCount = 0;

export interface INotificationsState {
	intent: Intent;
	saving: boolean;
	milliSecondsRemaining: number;
}

@observer
export class Notifications extends React.Component<{}, INotificationsState> {
	public state: INotificationsState = {
		intent: Intent.NONE,
		milliSecondsRemaining: 0,
		saving: false
	}

	private countDownInterval?: NodeJS.Timer;

	public render() {
		const { milliSecondsRemaining } = this.state;

		const timer = milliSecondsRemaining > 0
			? `${(milliSecondsRemaining / 1000).toFixed(1)} seconds remaining...`
			: '';

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
				<div className="example stack vertical">
					<div className="stack">
						<Button onClick={this.startSave}>Click here to simulate save.</Button> 
						<Button disabled={!this.state.saving} minimal={true} onClick={this.leaveWebsite}>
							Click here to simulate user attempting to leave website. <span>(or press</span> <Icon icon="refresh" /> <span>refresh).</span>
						</Button> 
					</div>
					<span>{timer}</span>
					<BeforeUnload shouldWarn={this.shouldWarnBeforeLeaving} />
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

	private startSave = () => {
		this.setState({ saving: true, milliSecondsRemaining: 4000 });

		this.countDownInterval = setInterval(this.countDown, 50);
	}

	private countDown = () => {
		let { milliSecondsRemaining } = this.state;
		milliSecondsRemaining -= 50;

		if (milliSecondsRemaining > 0) {
			this.setState({ milliSecondsRemaining });
		} else {
			if (this.countDownInterval) {
				clearInterval(this.countDownInterval);
				this.countDownInterval = undefined;
			}
			this.setState({ saving: false, milliSecondsRemaining: 0 });
		}
	}

	private leaveWebsite = () => {
		window.location.href = "http://www.google.com";
	}

	private shouldWarnBeforeLeaving = () => {
		return this.state.saving;
	}
}

export default Notifications;