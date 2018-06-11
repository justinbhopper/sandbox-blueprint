
import * as http from 'http'
import api from './api'

const defaultPort = 3000;
const port = (process.env.PORT ? parseInt(process.env.PORT, 10) : defaultPort) || defaultPort;

const server = http.createServer(api);
server.listen(port);