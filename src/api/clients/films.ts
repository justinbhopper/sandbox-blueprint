import IFilmsApi from "api/IFilmsApi";
import { IFilm } from "schemas";
import axios from "./axios";
import IFilmsApiClient from "./IFilmsApiClient";

const api = axios.create<IFilmsApi>({
	baseURL: '/api'
});

export default class FilmsApiClient implements IFilmsApiClient {
	public async getAll(): Promise<IFilm[]> {
		const res = await api.get('/films');
		return res.data;
	}

	public async get(id: number): Promise<IFilm> {
		const res = await api.get<'/films/:id'>('/films/'+ id);
		return res.data;
	}
	
	public async create(data: IFilm): Promise<IFilm> {
		const res = await api.post('/films', data);
		return res.data;
	}
	
	public async delete(id: number): Promise<void> {
		await api.delete<'/films/:id'>('/films/'+ id);
	}
}