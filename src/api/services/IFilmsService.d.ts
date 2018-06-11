import { IFilm } from "schemas";

export default interface IFilmsService
{
	create(data: IFilm): Promise<IFilm>;
	list(): Promise<IFilm[]>;
	get(id: number): Promise<IFilm>;
	delete(id: number): Promise<void>;
}