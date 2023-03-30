// Internal dependencies
import api from '.';
import { ResponseType } from 'shared/src/types';
import { EnvironmentVariablesClass } from 'shared/src/classes';

async function getAllVariables(
	projectId: string
): Promise<ResponseType<EnvironmentVariablesClass[]>> {
	const request = await api.get('/environmentVariables/' + projectId);

	return request.data;
}

async function createVariable(
	variable: EnvironmentVariablesClass
): Promise<ResponseType<EnvironmentVariablesClass>> {
	const request = await api.post('/environmentVariables', variable);

	return request.data;
}

export { getAllVariables, createVariable };
