import { IRouter } from "express-serve-static-core";

import filmsRouter from './films/router'
import filmsService from "./films/service";

export default (app: IRouter) => {
	filmsRouter(app, filmsService());
}