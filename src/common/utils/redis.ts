import * as redis from 'redis'

type PromiseCallback<T> = (err: Error | null, res: T) => void;

function promiseCb<T>(clientAction: (cb: PromiseCallback<T>) => void): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		clientAction((err: Error | null, res: T) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
}

export function createClient(options?: redis.ClientOpts) {
	const client = redis.createClient(options);

	return {
		exists(key: string): Promise<number> {
			return promiseCb<number>(cb => client.exists(key, cb));
		},
		
		async get<T>(key: string): Promise<T> {
			const res = await promiseCb<string>(cb => client.get(key, cb));
			return JSON.parse(res);
		},
		
		async set<T>(key: string, value: T): Promise<void> {
			const strVal = JSON.stringify(value);
			await promiseCb<string>(cb => client.set(key, strVal, cb));
		}
	}
}