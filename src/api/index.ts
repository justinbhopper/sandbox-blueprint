
import { MissingResourceError } from 'exceptions';
import * as express from 'express'
import routes from './routers'

const app = express();
const apiRouter = express.Router();

app.use('/api', apiRouter);
routes(apiRouter);

app.use((err: Error, req: express.Request, res: express.Response) => {
	if (err instanceof MissingResourceError) {
		res.sendStatus(404);
	}
})

export default app;