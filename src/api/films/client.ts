
import * as api from '@justinbhopper/cqrs-sandbox'
import filmsService from './service'

export default (): api.IFilmsClient => {

	// TODO: express service is not working in react-script, 
	// so we will fake the calls by just providing a local service
	return filmsService();

	return new api.FilmsClient();
}