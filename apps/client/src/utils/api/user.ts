// Internal dependencies
import api from './';

async function createUser({
	username,
	email,
	password
}: {
	username: string;
	email: string;
	password: string;
}): Promise<boolean> {
	const request = await api.post('/users/create', {
		username,
		email,
		password
	});

	return request.data.success;
}

export { createUser };
