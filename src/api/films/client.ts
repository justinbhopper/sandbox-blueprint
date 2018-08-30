
import IFilmsApiClient from "./IFilmsApiClient";

import filmsService from './service'

// TODO: how to fix this so I don't have to point to the exact file
import { Film, FilmsClient, IFilm } from '@tehsolace/core-sandbox/Generated/client'

export default (): IFilmsApiClient => {

	// TODO: express service is not working in react-script, 
	// so we will fake the calls by just providing a local service
	return filmsService();

	const api = new FilmsClient();
	
	return {
		async getAll(): Promise<IFilm[]> {
			return await api.getAll();
		},
	
		async get(id: number): Promise<IFilm> {
			return await api.getById(id);
		},
		
		async create(data: Film): Promise<IFilm> {
			return await api.insert(data);
		},
		
		async update(id: number, data: Film): Promise<IFilm> {
			return await api.update(id, data);
		},
		
		async delete(id: number): Promise<void> {
			await api.delete(id);
		}
	};
}