import { IFilm } from '@tehsolace/core-sandbox/Generated/client'

export default interface IFilmsService {
	getAll(): Promise<IFilm[]>;
	get(id: number): Promise<IFilm>;
	create(data: IFilm): Promise<IFilm>;
	update(id: number, data: IFilm): Promise<IFilm>;
	delete(id: number): Promise<void>;
}