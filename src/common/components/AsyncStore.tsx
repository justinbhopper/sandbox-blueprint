export interface IAsyncStore<T> {
	fetchAsync(): Promise<T[]>;
}