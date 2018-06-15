import { IFilm } from "schemas";
import { ITypedAxiosStatic } from "../../common/utils/axios";
import IFilmsApi from "./IFilmsApi";
import IFilmsApiClient from "./IFilmsApiClient";

export default (axios: ITypedAxiosStatic): IFilmsApiClient => {
	const api = axios.create<IFilmsApi>();
	
	return {
		async getAll(): Promise<IFilm[]> {
			const res = await api.get('/films');
			return res.data;
		},
	
		async get(id: number): Promise<IFilm> {
			const res = await api.get<'/films/:id'>('/films/'+ id);
			return res.data;
		},
		
		async create(data: IFilm): Promise<IFilm> {
			const res = await api.post('/films', data);
			return res.data;
		},
		
		async delete(id: number): Promise<void> {
			await api.delete<'/films/:id'>('/films/'+ id);
		}
	};
}