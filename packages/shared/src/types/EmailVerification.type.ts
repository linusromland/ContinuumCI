// Internal dependencies
import { UserClass } from '../classes/User.class';

type EmailVerificationType = {
	_id: string;
	user: string | UserClass;
	createdAt: Date;
};

export { EmailVerificationType };
