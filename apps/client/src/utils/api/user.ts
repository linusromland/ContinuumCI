// Internal dependencies
import { ResponseType } from 'shared/src/types';
import api from './';

async function createUser({
	username,
	email,
	password
}: {
	username: string;
	email: string;
	password: string;
}): Promise<boolean> {
	const request = await api.post('/users/create', {
		username,
		email,
		password
	});

	return request.data.success;
}

async function getUser(): Promise<ResponseType> {
	const request = await api.get('/profile');

	return request.data;
}

async function updateUsername(username: string): Promise<ResponseType> {
	const request = await api.put('/users/edit/username', {
		username
	});

	return request.data;
}

async function updateEmail(email: string): Promise<ResponseType> {
	const request = await api.put('/users/edit/email', {
		email
	});

	return request.data;
}

async function updatePassword(
	oldPassword: string,
	newPassword: string
): Promise<ResponseType> {
	const request = await api.put('/users/edit/password', {
		oldPassword,
		newPassword
	});

	return request.data;
}

export { createUser, getUser, updateUsername, updateEmail, updatePassword };
