// Internal dependencies
import { NginxDeploymentClass } from 'shared/src/classes';
import { ResponseType } from 'shared/src/types';
import api from '..';

async function getDeployments(): Promise<ResponseType<NginxDeploymentClass[]>> {
	const request = await api.get('/nginx/deployments');

	return request.data;
}

export { getDeployments };
