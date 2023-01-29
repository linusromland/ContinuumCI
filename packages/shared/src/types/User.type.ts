// Internal dependencies
import { ResponseType } from './';

type UserType = {
	_id: string;
	username: string;
	email: string;
	password?: string;
	role: string;
	verifiedEmail: boolean;
};

type UserResponseType = UserType & ResponseType;

export { UserResponseType, UserType };
