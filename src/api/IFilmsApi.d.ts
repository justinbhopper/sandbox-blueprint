import { IFilm } from "schemas";

export default interface IFilmsApi
{
	'/films': {
		GET: {
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