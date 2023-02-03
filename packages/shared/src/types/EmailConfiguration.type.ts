// Internal dependencies
import { ResponseType } from './';
import { EmailConfigurationServiceEnum } from '../enums';

type EmailConfigurationType = {
	service: EmailConfigurationServiceEnum;
	auth: {
		user: string;
		pass: string;
	};
};

type EmailConfigurationResponseType = EmailConfigurationType & ResponseType;

export { EmailConfigurationResponseType, EmailConfigurationType };
