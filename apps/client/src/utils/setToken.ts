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

	if (!tokenRequest.success || !tokenRequest.data) {
		throw new Error('Invalid credentials');
	}

	if (rememberMe) {
		localStorage.setItem('token', tokenRequest.data.access_token);
	} else {
		sessionStorage.setItem('token', tokenRequest.data.access_token);
	}

	if (tokenRequest.success) {
		updateHeader(tokenRequest.data.access_token as string);
		return;
	}
}

function updateHeader(token: string) {
	api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default setToken;
