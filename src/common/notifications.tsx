
import { 
	IToaster,
	IToastOptions,
	IToastProps,
	Position,
	Toaster
} from '@blueprintjs/core'

interface IQueuedToast
{
	props: IToastProps;
	key?: string;
}

let toastId = 0;
const toastLimit = 3;

const toastQueue: IQueuedToast[] = [];

const toaster = Toaster.create({
	position: Position.TOP
});

export const Notification: IToaster = {
	/**
	 * Shows a new toast to the user, or updates an existing toast corresponding to the provided key (optional).
	 *
	 * Returns the unique key of the toast.
	 */
	show(props: IToastProps, key?: string): string
	{
		if (key === undefined) {
			key = 'notification-'+ toastId++;
		}

		const originalOnDismissHandler = props.onDismiss;
		props.onDismiss = (didTimeoutExpire: boolean) => {
			const next = toastQueue.shift();

			if (next !== undefined) {
				toaster.show(next.props, next.key);
			}
		
			if (originalOnDismissHandler) {
				originalOnDismissHandler(didTimeoutExpire);
			}
		}
		
		if (this.getToasts().length < toastLimit) {
			toaster.show(props, key);
		} else {
			toastQueue.push({ props, key });
		}

		return key;
	},

	/** Dismiss the given toast instantly. */
	dismiss(key: string): void
	{
		toaster.dismiss(key);
	},

	/** Dismiss all toasts instantly. */
	clear(): void
	{
		toaster.clear();
	},

	/** Returns the props for all current toasts. */
	getToasts(): IToastOptions[]
	{
		return toaster.getToasts();
	}
};