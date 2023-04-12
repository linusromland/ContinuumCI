// Internal dependencies
import api from './';
import { ResponseType, SetupType } from 'shared/src/types';

async function getSetup(): Promise<ResponseType<SetupType>> {
	const request = await api.get('/setup');

	return request.data as ResponseType<SetupType>;
}

export { getSetup };
