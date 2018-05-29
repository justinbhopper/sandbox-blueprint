import axios, {
	AxiosInterceptorManager,
	AxiosRequestConfig,
	AxiosResponse,
	CancelStatic,
	CancelTokenStatic
} from 'axios'

import { RestypedBase, RestypedIndexedBase, RestypedRoute } from 'restyped'

export interface ITypedAxiosRequestConfig<
	API extends RestypedIndexedBase,
	Path extends keyof API,
	Method extends keyof API[Path],
	RouteDef extends RestypedRoute = API[Path][Method]
> extends AxiosRequestConfig {
	url?: Path
	method?: Method
	params?: RouteDef['query']
	data?: RouteDef['body']
}

export interface ITypedAxiosResponse<
	API extends RestypedIndexedBase,
	Path extends keyof API,
	Method extends keyof API[Path],
	RouteDef extends RestypedRoute = API[Path][Method]
> extends AxiosResponse {
	data: RouteDef['response']
	config: ITypedAxiosRequestConfig<API, Path, Method>
}

function applyUrlParams(url: string, params: { [key: string]: string | number }): string {
	Object.keys(params).forEach(key => {
		url = url.replace(':'+ key, params[key].toString());
	});

	return url;
}

export class TypedAxiosInstance<API extends RestypedBase = any> {
	public defaults: AxiosRequestConfig | undefined;
	public interceptors: { 
		request: AxiosInterceptorManager<AxiosRequestConfig>; 
		response: AxiosInterceptorManager<AxiosResponse>; 
	};

	constructor(config?: AxiosRequestConfig) {
		this.defaults = config;
	}

	public request<Path extends keyof API, Method extends keyof API[Path]= "GET">(
		config: ITypedAxiosRequestConfig<API, Path, Method>
	): Promise<ITypedAxiosResponse<API, Path, Method>> {
		return axios.request(config || this.defaults) as any;
	}

	public get<Path extends keyof API>(url: string | Path, config?: ITypedAxiosRequestConfig<API, Path, "GET">): Promise<ITypedAxiosResponse<API, Path, "GET">>;
	public get<Path extends keyof API>(url: Path, params: API[Path]["GET"]["params"], config?: ITypedAxiosRequestConfig<API, Path, "GET">): Promise<ITypedAxiosResponse<API, Path, "GET">>;
	public get<Path extends keyof API>(url: string | Path, params?: API[Path]["GET"]["params"] | AxiosRequestConfig, config?: AxiosRequestConfig) {
		config = config || this.defaults;
		if (url.indexOf(':') === -1 && arguments.length > 1) {
			return axios.get(url, config) as any;
		}
		return axios.get(applyUrlParams(url, params as any), config);
	}

	public delete<Path extends keyof API>(url: string | Path, config?: ITypedAxiosRequestConfig<API, Path, "DELETE", API[Path]["DELETE"]>): Promise<ITypedAxiosResponse<API, Path, "DELETE", API[Path]["DELETE"]>>;
	public delete<Path extends keyof API>(url: Path, params: API[Path]["DELETE"]["params"], config?: ITypedAxiosRequestConfig<API, Path, "DELETE", API[Path]["DELETE"]>): Promise<ITypedAxiosResponse<API, Path, "DELETE", API[Path]["DELETE"]>>;
	public delete<Path extends keyof API>(url: string | Path, params?: API[Path]["DELETE"]["params"] | AxiosRequestConfig, config?: AxiosRequestConfig) {
		config = config || this.defaults;
		if (url.indexOf(':') === -1 && arguments.length > 1) {
			return axios.delete(url, config) as any;
		}
		return axios.delete(applyUrlParams(url, params as any), config);
	}

	public head<Path extends keyof API>(url: string | Path, config?: ITypedAxiosRequestConfig<API, Path, "HEAD", API[Path]["HEAD"]>): Promise<ITypedAxiosResponse<API, Path, "HEAD", API[Path]["HEAD"]>>;
	public head<Path extends keyof API>(url: Path, params: API[Path]["HEAD"]["params"], config?: ITypedAxiosRequestConfig<API, Path, "HEAD", API[Path]["HEAD"]>): Promise<ITypedAxiosResponse<API, Path, "HEAD", API[Path]["HEAD"]>>;
	public head<Path extends keyof API>(url: string | Path, params?: API[Path]["HEAD"]["params"] | AxiosRequestConfig, config?: AxiosRequestConfig) {
		config = config || this.defaults;
		if (url.indexOf(':') === -1 && arguments.length > 1) {
			return axios.head(url, config) as any;
		}
		return axios.head(applyUrlParams(url, params as any), config);
	}

	public post<Path extends keyof API>(url: string | Path, data?: API[Path]["POST"]["body"], config?: ITypedAxiosRequestConfig<API, Path, "POST", API[Path]["POST"]>): Promise<ITypedAxiosResponse<API, Path, "POST", API[Path]["POST"]>>;
	public post<Path extends keyof API>(url: Path, params: API[Path]["POST"]["params"], data?: API[Path]["POST"]["body"], config?: ITypedAxiosRequestConfig<API, Path, "POST", API[Path]["POST"]>): Promise<ITypedAxiosResponse<API, Path, "POST", API[Path]["POST"]>>;
	public post<Path extends keyof API>(url: any, params?: API[Path]["POST"]["params"] | AxiosRequestConfig, data?: any, config?: any) {
		config = config || this.defaults;
		if (url.indexOf(':') === -1 && arguments.length > 1) {
			return axios.post(url, config) as any;
		}
		return axios.post(applyUrlParams(url, params as any), data, config);
	}

	public put<Path extends keyof API>(url: string | Path, data?: API[Path]["PUT"]["body"], config?: ITypedAxiosRequestConfig<API, Path, "PUT", API[Path]["PUT"]>): Promise<ITypedAxiosResponse<API, Path, "PUT", API[Path]["PUT"]>>;
	public put<Path extends keyof API>(url: Path, params: API[Path]["PUT"]["params"], data?: API[Path]["PUT"]["body"], config?: ITypedAxiosRequestConfig<API, Path, "PUT", API[Path]["PUT"]>): Promise<ITypedAxiosResponse<API, Path, "PUT", API[Path]["PUT"]>>;
	public put<Path extends keyof API>(url: any, params?: API[Path]["PUT"]["params"] | AxiosRequestConfig, data?: any, config?: any) {
		config = config || this.defaults;
		if (url.indexOf(':') === -1 && arguments.length > 1) {
			return axios.put(url, config) as any;
		}
		return axios.put(applyUrlParams(url, params as any), data, config);
	}

	public patch<Path extends keyof API>(url: string | Path, data?: API[Path]["PATCH"]["body"], config?: ITypedAxiosRequestConfig<API, Path, "PATCH", API[Path]["PATCH"]>): Promise<ITypedAxiosResponse<API, Path, "PATCH", API[Path]["PATCH"]>>;
	public patch<Path extends keyof API>(url: Path, params: API[Path]["PATCH"]["params"], data?: API[Path]["PATCH"]["body"], config?: ITypedAxiosRequestConfig<API, Path, "PATCH", API[Path]["PATCH"]>): Promise<ITypedAxiosResponse<API, Path, "PATCH", API[Path]["PATCH"]>>;
	public patch<Path extends keyof API>(url: any, params?: API[Path]["PATCH"]["params"] | AxiosRequestConfig, data?: any, config?: any) {
		config = config || this.defaults;
		if (url.indexOf(':') === -1 && arguments.length > 1) {
			return axios.patch(url, config) as any;
		}
		return axios.patch(applyUrlParams(url, params as any), data, config);
	}
}

// tslint:disable-next-line:max-classes-per-file
export class TypedAxiosStatic<AnyAPI extends RestypedBase = any> extends TypedAxiosInstance<AnyAPI> {
	public get Cancel(): CancelStatic {
		return axios.Cancel;
	}

	public get CancelToken(): CancelTokenStatic {
		return axios.CancelToken;
	}

	public create<API>(config?: AxiosRequestConfig): TypedAxiosInstance<API> {
		return new TypedAxiosInstance<API>(config);
	}

	public isCancel(value: any): boolean {
		return axios.isCancel(value);
	}

	public all<API>(values: Array<API | Promise<API>>): Promise<API[]> {
		return axios.all(values);
	}

	public spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R {
		return axios.spread(callback);
	}
}

const TypedAxios = new TypedAxiosStatic();

export default TypedAxios;
