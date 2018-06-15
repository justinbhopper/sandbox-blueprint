import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	CancelStatic,
	CancelTokenStatic
} from 'axios'

import {RestypedBase, RestypedRoute} from 'restyped'

export interface ITypedAxiosRequestConfig<
	API extends RestypedBase,
	Path extends keyof API & string,
	Method extends keyof API[Path] & string,
	RouteDef extends RestypedRoute = API[Path][Method]
> extends AxiosRequestConfig {
	url?: Path
	method?: Method
	params?: RouteDef['query']
	data?: RouteDef['body']
}

export interface ITypedAxiosResponse<
	API extends RestypedBase,
	Path extends keyof API & string,
	Method extends keyof API[Path] & string,
	RouteDef extends RestypedRoute = API[Path][Method]
> extends AxiosResponse {
	data: RouteDef['response']
	config: ITypedAxiosRequestConfig<API, Path, Method>
}

export interface ITypedAxiosInstance<API extends RestypedBase = any> extends AxiosInstance {
	request<Path extends keyof API & string, Method extends keyof API[Path] & string = 'GET'>(
		config: ITypedAxiosRequestConfig<API, Path, Method>
	): Promise<ITypedAxiosResponse<API, Path, Method>>

	get<Path extends keyof API & string>(
		url: Path | string,
		config?: ITypedAxiosRequestConfig<API, Path, 'GET'>
	): Promise<ITypedAxiosResponse<API, Path, 'GET'>>

	delete<Path extends keyof API & string>(
		url: Path | string,
		config?: ITypedAxiosRequestConfig<API, Path, 'DELETE'>
	): Promise<ITypedAxiosResponse<API, Path, 'DELETE'>>

	head<Path extends keyof API & string>(
		url: Path | string,
		config?: ITypedAxiosRequestConfig<API, Path, 'HEAD'>
	): Promise<ITypedAxiosResponse<API, Path, 'HEAD'>>

	post<Path extends keyof API & string>(
		url: Path | string,
		data?: API[Path]['POST']['body'],
		config?: ITypedAxiosRequestConfig<API, Path, 'POST'>
	): Promise<ITypedAxiosResponse<API, Path, 'POST'>>

	put<Path extends keyof API & string>(
		url: Path | string,
		data?: API[Path]['PUT']['body'],
		config?: ITypedAxiosRequestConfig<API, Path, 'PUT'>
	): Promise<ITypedAxiosResponse<API, Path, 'PUT'>>

	patch<Path extends keyof API & string>(
		url: Path | string,
		data?: API[Path]['PATCH']['body'],
		config?: ITypedAxiosRequestConfig<API, Path, 'PATCH'>
	): Promise<ITypedAxiosResponse<API, Path, 'PATCH'>>
}

export interface ITypedAxiosStatic<API extends RestypedBase = any> extends ITypedAxiosInstance<API> {
	Cancel: CancelStatic;
	CancelToken: CancelTokenStatic;

	<Path extends keyof API & string, Method extends keyof API[Path] & string= 'GET'>(
		config: ITypedAxiosRequestConfig<API, Path, Method>
	): Promise<ITypedAxiosResponse<API, Path, Method>>;

	<Path extends keyof API & string, Method extends keyof API[Path] & string>(
		url: Path | string,
		config?: ITypedAxiosRequestConfig<API, Path, Method>
	): Promise<ITypedAxiosResponse<API, Path, Method>>;

	create<T extends API>(config?: AxiosRequestConfig): ITypedAxiosInstance<T>;

	isCancel(value: any): boolean;
	all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
	spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

const TypedAxios: ITypedAxiosStatic = axios as any

export default TypedAxios