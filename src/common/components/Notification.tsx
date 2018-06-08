
import {
	Intent,
	IToaster,
	IToastOptions,
	IToastProps,
	Position,
	Toaster
} from '@blueprintjs/core'
import { action, observable } from 'mobx';

export interface INotifier extends IToaster {
	readonly silenced: boolean;
	silence(): void;
	unsilence(): void;
}

interface IQueuedToast {
	props: IToastProps;
	key?: string;
}

let toastId = 0;
const toastLimit = 3;

const toastQueue: IQueuedToast[] = [];

const toaster = Toaster.create({
	position: Position.TOP
});

function getDefaultTimeout(): number {
	return Math.max(2000, 5000 - (toaster.getToasts().length * 1000));
}

const silenced = observable.box<boolean>(false, {
	name: "silenced"
});

let autoDismiss: NodeJS.Timer;
const NotificationSuppresser = {
	toaster: Toaster.create({
		position: Position.TOP_RIGHT
	}),

	onToastShown() {
		if (toastQueue.length === 0) {
			return;
		}

		if (this.toaster.getToasts().length === 0) {
			if (autoDismiss) {
				clearTimeout(autoDismiss);
			}

			this.toaster.show({
				action: {
					onClick: () => {
						silenced.set(true);
					},
					text: "Silence Notifications"
				},
				icon: "notifications",
				intent: Intent.WARNING,
				message: "Notifications getting annoying?",
				timeout: 0
			});
		}
	},

	onToastDismissed() {
		if (toastQueue.length > 0 || toaster.getToasts().length > 1 || this.toaster.getToasts().length === 0) {
			return;
		}

		if (autoDismiss) {
			clearTimeout(autoDismiss);
		}

		autoDismiss = setTimeout(() => {
			this.toaster.clear();
		}, 3000);
	}
}

export class Notifier implements INotifier {
	public get silenced(): boolean {
		return silenced.get();
	}

	/**
	 * Shows a new toast to the user, or updates an existing toast corresponding to the provided key (optional).
	 *
	 * Returns the unique key of the toast.
	 */
	public show(props: IToastProps, key?: string): string {
		if (this.silenced) {
			return "";
		}

		if (key === undefined) {
			key = 'notification-' + toastId++;
		}

		if (props.timeout === undefined) {
			props.timeout = getDefaultTimeout();
		}

		const originalOnDismissHandler = props.onDismiss;
		props.onDismiss = (didTimeoutExpire: boolean) => {
			const next = toastQueue.shift();

			if (next !== undefined && !this.silenced) {
				setTimeout(() => {
					toaster.show(next.props, next.key);
				}, 500);
			}

			NotificationSuppresser.onToastDismissed();

			if (originalOnDismissHandler) {
				originalOnDismissHandler(didTimeoutExpire);
			}
		}

		if (this.getToasts().length < toastLimit) {
			toaster.show(props, key);
		} else {
			toastQueue.push({ props, key });
		}

		NotificationSuppresser.onToastShown();

		return key;
	}

	/** Dismiss the given toast instantly. */
	public dismiss(key: string): void {
		toaster.dismiss(key);
	}

	/** Dismiss all toasts instantly. */
	public clear(): void {
		toaster.clear();
	}

	/** Returns the props for all current toasts. */
	public getToasts(): IToastOptions[] {
		return toaster.getToasts();
	}

	@action("silenced")
	public silence(): void {
		silenced.set(true);
	}

	@action("silenced")
	public unsilence(): void {
		silenced.set(false);
	}
}

export const Notification = new Notifier();
export default Notification;