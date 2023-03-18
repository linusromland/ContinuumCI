// Internal dependencies
import { ResponseType } from 'shared/src/types';
import api from '..';

async function getDomains(): Promise<ResponseType> {
	const request = await api.get('/nginx/domains');

	return request.data;
}

async function createDomain(domainName: string): Promise<boolean> {
	const request = await api.post('/nginx/domains/create', {
		name: domainName
	});

	return request.data.success;
}

async function deleteDomain(domainId: string): Promise<boolean> {
	const request = await api.delete(`/nginx/domains/delete/${domainId}`);

	return request.data.success;
}

export { getDomains, createDomain, deleteDomain };
