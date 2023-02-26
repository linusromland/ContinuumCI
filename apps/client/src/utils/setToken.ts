// Internal dependencies
import api from './api';
import { getToken } from './api/getToken';

async function setToken(email: string, password: string) {
	const tokenRequest = await getToken(email, password);

	api.defaults.headers.common.Authorization = `Bearer ${tokenRequest.access_token}`;
}

export default setToken;
