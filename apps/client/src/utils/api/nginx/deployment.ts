// Internal dependencies
import { NginxDeploymentClass, NginxDeploymentQueryClass } from 'shared/src/classes';
import { ResponseType } from 'shared/src/types';
import api from '..';

async function getDeployments(): Promise<ResponseType<NginxDeploymentClass[]>> {
	const request = await api.get('/nginx/deployments');

	return request.data;
}

async function createDeployment(data: NginxDeploymentQueryClass): Promise<ResponseType<NginxDeploymentClass>> {
	const request = await api.post('/nginx/deployments/create', data);

	return request.data;
}

async function removeDeployment(id: string): Promise<ResponseType> {
	const request = await api.post('/nginx/deployments/delete', { id });

	return request.data;
}

export { getDeployments, createDeployment, removeDeployment };
