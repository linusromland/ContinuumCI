// Internal dependencies
import api from '.';
import { OverviewType, ResponseType } from 'shared/src/types';

async function getOverview(): Promise<ResponseType<OverviewType>> {
	const request = await api.get('/overview');

	return request.data as ResponseType<OverviewType>;
}

export { getOverview };
