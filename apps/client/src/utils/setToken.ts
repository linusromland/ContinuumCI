// Internal dependencies
import api from './api';
import { getToken } from './api/getToken';

async function setToken({
	email,
	password,
	rememberMe,
	token
}: {
	email?: string;
	password?: string;
	rememberMe?: boolean;
	token?: string;
}) {
	if (!email && !password && !token) {
		throw new Error('No credentials provided');
	}

	if (token) {
		updateHeader(token);
		return;
	}

	if (!email || !password) {
		throw new Error('No email or password provided');
	}

	const tokenRequest = await getToken(email, password);
	const tokenData = tokenRequest.data as { access_token: string };

	if (rememberMe) {
		localStorage.setItem('token', tokenData.access_token as string);
	}
	if (tokenRequest.success) {
		updateHeader(tokenData.access_token as string);
		return;
	}
}

function updateHeader(token: string) {
	api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default setToken;
