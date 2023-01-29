// Internal dependencies
import { ResponseType } from './';

type JwtType = {
	username: string;
	email: string;
	verifiedEmail: boolean;
	sub: string;
	iat: number;
	exp: number;
};

type JwtResponseType = JwtType & ResponseType;

export default JwtResponseType;
