import { IFilm } from "schemas";

export default interface IFilmsApiClient {
	getAll(): Promise<IFilm[]>;
	get(id: number): Promise<IFilm>;
	create(data: IFilm): Promise<IFilm>;
	delete(id: number): Promise<void>;
}