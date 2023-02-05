// Internal dependencies
import { ResponseType, UserType } from './';

type EmailVerificationType = {
	_id: string;
	user: string | UserType;
	createdAt: Date;
};

type EmailVerificationResponseType = EmailVerificationType & ResponseType;

export { EmailVerificationResponseType, EmailVerificationType };
