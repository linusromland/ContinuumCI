// Internal dependencies
import api from './';
import { ResponseType } from 'shared/src/types';

async function getToken(email: string, password: string): Promise<ResponseType> {
	const request = await api.post('/auth/login', {
		email,
		password
	});

	return request.data as ResponseType;
}

export { getToken };
