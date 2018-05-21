
import {
	Intent,
	IToaster,
	IToastOptions,
	IToastProps,
	Position,
	Toaster
} from '@blueprintjs/core'

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

let silenced = false;

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
						silenced = true;
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

export const Notification: IToaster = {
	/**
	 * Shows a new toast to the user, or updates an existing toast corresponding to the provided key (optional).
	 *
	 * Returns the unique key of the toast.
	 */
	show(props: IToastProps, key?: string): string {
		if (silenced) {
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

			if (next !== undefined && !silenced) {
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
	},

	/** Dismiss the given toast instantly. */
	dismiss(key: string): void {
		toaster.dismiss(key);
	},

	/** Dismiss all toasts instantly. */
	clear(): void {
		toaster.clear();
	},

	/** Returns the props for all current toasts. */
	getToasts(): IToastOptions[] {
		return toaster.getToasts();
	}
};