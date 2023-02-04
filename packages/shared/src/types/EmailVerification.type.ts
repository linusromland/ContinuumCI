// Internal dependencies
import { ResponseType, UserType } from './';

type EmailVerification = {
	_id: string;
	user: string | UserType;
	createdAt: Date;
};

type EmailVerificationResponseType = EmailVerification & ResponseType;

export { EmailVerificationResponseType, EmailVerification };
