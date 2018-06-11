import IFilmsApi from "api/IFilmsApi";
import IFilmsService from "api/services/IFilmsService";
import { IRouter } from "express-serve-static-core";
import RestypedRouter from 'restyped-express-async'

export default (app: IRouter, filmsService: IFilmsService) => {
	const router = RestypedRouter<IFilmsApi>(app);

	router.get('/films', async () => {
		try {
			return await filmsService.list();
		} catch (e) {
			throw e; // TODO: handle errors and return correct status code
		}
	});

	router.post('/films', async (req) => {
		try {
			// TODO: validate body
			return await filmsService.create(req.body);
		} catch (e) {
			throw e; // TODO: handle errors and return correct status code
		}
	});

	router.get('/films/:id', async (req, res) => {
		try {
			return await filmsService.get(req.params.id);
		} catch (e) {
			// res.status(404);
			throw e; // TODO: handle errors and return correct status code
		}
	});

	router.delete('/films/:id', async (req, res) => {
		try {
			await filmsService.delete(req.params.id);
			res.status(200); // is this necessary?
		} catch (e) {
			// res.status(404);
			throw e; // TODO: handle errors and return correct status code
		}
	});
}