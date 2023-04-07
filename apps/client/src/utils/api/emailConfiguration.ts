// Internal dependencies
import api from '.';
import { ResponseType } from 'shared/src/types';
import { EmailConfigurationClass } from 'shared/src/classes';

async function updateEmailConfiguration({
	service,
	auth
}: {
	service: string;
	auth?: {
		user: string;
		pass: string;
	};
}): Promise<ResponseType<EmailConfigurationClass>> {
	const request = await api.put('/emailConfiguration', {
		service,
		auth
	});

	return request.data;
}

export { updateEmailConfiguration };
