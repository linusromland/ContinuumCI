// Internal dependencies
import { UserClass } from '../classes/User.class';

type ForgotPasswordType = {
	_id: string;
	user: string | UserClass;
	createdAt: Date;
};

export { ForgotPasswordType };
