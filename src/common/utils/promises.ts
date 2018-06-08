
export function delay(timeoutMilliseconds: number): Promise<void> {
	return new Promise<void>(resolve => {
		setTimeout(() => {
			resolve();
		}, timeoutMilliseconds)
	})
}