// Internal dependencies
import api from '.';
import { ResponseType } from 'shared/src/types';

async function updateEmailConfiguration({
	service,
	auth
}: {
	service: string;
	auth?: {
		user: string;
		pass: string;
	};
}): Promise<ResponseType> {
	const request = await api.put('/emailConfiguration', {
		service,
		auth
	});

	return request.data;
}

export { updateEmailConfiguration };
