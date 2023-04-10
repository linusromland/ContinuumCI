// Internal dependencies
import api from '.';
import { ContainerType, ResponseType } from 'shared/src/types';

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

export { getContainers };
