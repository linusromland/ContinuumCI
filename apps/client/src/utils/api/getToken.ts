// Internal dependencies
import api from './';
import { ResponseType } from 'shared/src/types';

async function getToken(email: string, password: string): Promise<ResponseType<{ access_token: string }>> {
	const request = await api.post('/auth/login', {
		email,
		password
	});

	return request.data as ResponseType<{ access_token: string }>;
}

export { getToken };
