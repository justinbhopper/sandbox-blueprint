
import * as express from 'express'
import routes from './routes'

const app = express();
const apiRouter = express.Router();

app.use('/api', apiRouter)
routes(apiRouter);

export default app;