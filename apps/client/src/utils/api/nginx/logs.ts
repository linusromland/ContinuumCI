// Internal dependencies
import { NginxLogsType, ResponseType } from 'shared/src/types';
import api from '..';

async function getLogs(): Promise<ResponseType<NginxLogsType[]>> {
	const request = await api.get('/nginx/logs');

	return request.data;
}

export { getLogs };
