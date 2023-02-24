// Internal dependencies
import api from './';
import { LoginResponseType } from 'shared/src/types';

async function getToken(
	username: string,
	password: string
): Promise<LoginResponseType> {
	const request = await api.post('/auth/login', {
		username,
		password
	});

	return request.data as LoginResponseType;
}

export { getToken };
