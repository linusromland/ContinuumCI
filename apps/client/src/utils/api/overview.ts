// Internal dependencies
import api from './';
import { ResponseType } from 'shared/src/types';

async function getSetup(): Promise<ResponseType> {
	const request = await api.get('/setup');

	return request.data as ResponseType;
}

export { getSetup };
