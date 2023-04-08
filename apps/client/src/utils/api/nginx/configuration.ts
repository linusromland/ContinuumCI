// Internal dependencies
import { NginxConfigurationType, ResponseType } from 'shared/src/types';
import api from '..';

async function getConfiguration(): Promise<ResponseType> {
	const request = await api.get('/nginx/configuration');

	return request.data;
}

async function updateConfiguration(nginxConfiguration: NginxConfigurationType): Promise<ResponseType> {
	const request = await api.put('/nginx/configuration', nginxConfiguration);

	return request.data;
}

export { getConfiguration, updateConfiguration };
