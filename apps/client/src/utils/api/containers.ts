// Internal dependencies
import api from '.';
import { ContainerType, ContainerTypeWithLogs, ResponseType } from 'shared/src/types';

async function getContainers(projectIds?: string[]): Promise<ResponseType<ContainerType[]>> {
	let params = {};

	if (projectIds) {
		params = {
			ids: projectIds
		};
	}

	const request = await api.get('/containers', {
		params
	});

	return request.data as ResponseType<ContainerType[]>;
}

async function getContainerWithLogs(projectId: string): Promise<ResponseType<ContainerTypeWithLogs>> {
	const request = await api.get(`/containers/${projectId}`);

	return request.data as ResponseType<ContainerTypeWithLogs>;
}

export { getContainers, getContainerWithLogs };
