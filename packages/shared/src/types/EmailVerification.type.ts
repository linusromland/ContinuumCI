// Internal dependencies
import { ResponseType } from './';

type EmailVerification = {
	_id: string;
};

type EmailVerificationResponseType = EmailVerification & ResponseType;

export { EmailVerificationResponseType, EmailVerification };
