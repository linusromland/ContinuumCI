// Internal dependencies
import api from '.';
import { ContainerType, ResponseType } from 'shared/src/types';

async function getContainers(projectIds: string[]): Promise<ResponseType<ContainerType[]>> {
	const request = await api.get('/containers', {
		params: {
			ids: projectIds
		}
	});

	return request.data as ResponseType<ContainerType[]>;
}

export { getContainers };
