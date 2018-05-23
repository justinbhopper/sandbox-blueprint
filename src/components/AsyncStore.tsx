
export interface IAsyncStore<T> {
	fetch(): Promise<T[]>;
}