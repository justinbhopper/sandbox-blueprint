import { IRouter } from "express-serve-static-core";

import FilmsService from "../services/FilmsService";
import routeFilms from './films'

export default (app: IRouter) => {
	routeFilms(app, new FilmsService());
}