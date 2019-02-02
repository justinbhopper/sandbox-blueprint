import { observer } from 'mobx-react';
import * as React from 'react';

import {
	Button,
	Icon,
	Intent,
	Label,
	Switch,
	Tag
} from '@blueprintjs/core';

import Stack from '../../../common/components/Stack';
import BeforeUnload from '../../../common/components/BeforeUnload';
import Notification from '../../../common/components/Notification'
import { randomWords } from '../../../common/utils/words';
import Example from '../components/Example';
import IntentSelect from '../components/IntentSelect';

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

	private countDownTimer?: NodeJS.Timer;
	private countDownInterval?: NodeJS.Timer;

	public componentWillUnmount() {
		this.clearTimers();
	}

	public render() {
		const { milliSecondsRemaining } = this.state;

		const timer = milliSecondsRemaining > 0
			? `${(milliSecondsRemaining / 1000).toFixed(1)} seconds remaining...`
			: '';

		return (
			<>
				<Example>
					<Button large={true} icon="notifications" onClick={this.showNotification}>Repeatedly click here!</Button> 
				</Example>
				<Example>
					<Switch checked={Notification.silenced} onClick={this.toggleSilenced}>Notifications Silenced</Switch>
				</Example>
				<Example>
					<Label>
						Color
						<IntentSelect intent={this.state.intent} onChange={this.handleIntentChange} />
					</Label>
				</Example>
				<Example vertical={true}>
					<small>We can warn the user about leaving the site (or refreshing) while saves are in progress.</small>
					<Stack>
						<Button disabled={this.state.saving} onClick={this.startSave}>Click here to simulate save.</Button> 
						<Button disabled={!this.state.saving} minimal={true} onClick={this.leaveWebsite}>
							Click here to simulate user attempting to leave website. <span>(or press</span> <Icon icon="refresh" /> <span>refresh).</span>
						</Button> 
					</Stack>
					<span>{timer}</span>
					<BeforeUnload shouldWarn={this.shouldWarnBeforeLeaving} />
				</Example>
				<Example>
					<Button icon="error" onClick={this.showErrorAlert}>Simulate error alert</Button>
				</Example>
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
		const interval = 50;
		const timeout = 4000;
		
		this.setState({ saving: true, milliSecondsRemaining: timeout });

		this.countDownTimer = setTimeout(this.stopSave, timeout);
		this.countDownInterval = setInterval(() => this.countDown(interval), interval);
	}

	private countDown = (interval: number) => {
		const { milliSecondsRemaining } = this.state;
		this.setState({ milliSecondsRemaining: Math.max(milliSecondsRemaining - interval, 0) });
	}

	private stopSave = () => {
		this.setState({ saving: false, milliSecondsRemaining: 0 });
		this.clearTimers();
	}

	private clearTimers = () => {
		if (this.countDownInterval) {
			clearInterval(this.countDownInterval);
			this.countDownInterval = undefined;
		}

		if (this.countDownTimer) {
			clearTimeout(this.countDownTimer);
			this.countDownTimer = undefined;
		}
	}

	private leaveWebsite = () => {
		window.location.href = "http://www.google.com";
	}

	private shouldWarnBeforeLeaving = () => {
		return this.state.saving;
	}

	private showErrorAlert = () => {
		Notification.show({
			icon: 'warning-sign',
			intent: Intent.DANGER,
			message: (
				<>Oops!  We had an error.</>
			),
			action: {
				icon: 'flag',
				text: 'Report',
				onClick: this.reportError
			}
		});
	}

	private reportError = () => {
		const errorCode = randomWords(4).map(word => <><Tag intent={Intent.WARNING}>{word}</Tag> </>);

		Notification.show({
			icon: 'thumbs-up',
			intent: Intent.SUCCESS,
			timeout: 0,
			message: (
				<>
					The error has been reported to our diagnostics team. We will be investigating the issue.  Thank you for your support!<br />
					<br />
					<small>Your unique error code:</small> {errorCode}<br />
					<small>You may use this error code to reference this error with our team in the future.</small>
				</>
			)
		});
	}
}

export default Notifications;