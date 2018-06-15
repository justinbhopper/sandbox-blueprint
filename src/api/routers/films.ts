import IFilmsApi from "api/IFilmsApi";
import IFilmsService from "api/services/IFilmsService";
import { IRouter } from "express-serve-static-core";
import RestypedRouter from 'restyped-express-async'

export default (app: IRouter, filmsService: IFilmsService) => {
	const router = RestypedRouter<IFilmsApi>(app);

	router.get('/films', async () => {
		return await filmsService.list();
	});

	router.post('/films', async (req) => {
		// TODO: validate body
		return await filmsService.create(req.body);
	});

	router.get('/films/:id', async (req) => {
		return await filmsService.get(req.params.id);
	});

	router.delete('/films/:id', async (req, res) => {
		await filmsService.delete(req.params.id);
		res.sendStatus(204);
	});
}