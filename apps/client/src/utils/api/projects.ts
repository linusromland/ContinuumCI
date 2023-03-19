// Internal dependencies
import api from '.';
import { ResponseType } from 'shared/src/types';

async function getAllProjects(): Promise<ResponseType> {
	const request = await api.get('/projects/all');

	return request.data as ResponseType;
}

export { getAllProjects };
