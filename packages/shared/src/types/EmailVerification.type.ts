// Internal dependencies
import { UserType } from './';

type EmailVerificationType = {
	_id: string;
	user: string | UserType;
	createdAt: Date;
};

export { EmailVerificationType };
