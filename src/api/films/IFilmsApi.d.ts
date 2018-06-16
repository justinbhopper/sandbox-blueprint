import { IFilm } from "schemas";

type IFilmKey = keyof IFilm;

export default interface IFilmsApi {
	'/films': {
		GET: {
			query: {
				include?: IFilmKey[];
			};
			response: IFilm[];
		};
		POST: {
			body: IFilm;
			response: IFilm;
		};
	};

	'/films/:id': {
		GET: {
			params: {
				id: number;
			};
			query: {
				include?: IFilmKey[];
			};
			response: IFilm;
		};
		DELETE: {
			params: {
				id: number;
			};
			response: void;
		};
	};
}