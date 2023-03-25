// Internal dependencies
import api from '.';
import { ResponseType } from 'shared/src/types';
import { ProjectClass } from 'shared/src/classes';

async function getAllProjects(): Promise<ResponseType> {
	const request = await api.get('/projects/all');

	return request.data as ResponseType;
}

async function createProject(data: ProjectClass): Promise<ResponseType> {
	const request = await api.post('/projects/create', {
		...data,
		permissions: []
	});

	return request.data as ResponseType;
}

export { getAllProjects, createProject };
