// Internal dependencies
import api from './';
import { SetupResponseType } from 'shared/src/types';

async function getSetup(): Promise<SetupResponseType> {
	const request = await api.get('/setup');

	return request.data as SetupResponseType;
}

export { getSetup };
