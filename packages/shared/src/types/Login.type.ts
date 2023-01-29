// Internal dependencies
import { ResponseType } from './';

type LoginType = {
	access_token?: string;
};

type LoginResponseType = LoginType & ResponseType;

export { LoginResponseType, LoginType };
