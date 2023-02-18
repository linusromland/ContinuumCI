// Internal dependencies
import api from './';
import { ResponseType } from 'shared/src/types';

async function createUser({
	username,
	email,
	password
}: {
	username: string;
	email: string;
	password: string;
}): Promise<boolean> {
	const request = (await api.post('/users/create', {
		username,
		email,
		password
	})) as ResponseType;

	return request.success;
}

export { createUser };
