// Internal dependencies
import api from '.';
import { ResponseType } from 'shared/src/types';

async function createDeployment(projectId: string): Promise<ResponseType> {
	const request = await api.post('/deployments/create', {
		project: projectId
	});

	return request.data as ResponseType;
}

async function removeDeployment(projectId: string): Promise<ResponseType> {
	const request = await api.post('/deployments/remove', {
		project: projectId
	});

	return request.data as ResponseType;
}

export { createDeployment, removeDeployment };
