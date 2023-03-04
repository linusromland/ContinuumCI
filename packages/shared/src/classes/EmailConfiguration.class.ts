// External dependencies
import { IsString, ValidateNested } from 'class-validator';

// Internal dependencies
import { EmailConfigurationServiceEnum } from '../enums';

class EmailAuthClass {
	@IsString()
	user: string;

	@IsString()
	pass: string;
}

export class EmailConfigurationClass {
	@IsString()
	service: EmailConfigurationServiceEnum;

	@ValidateNested()
	auth: EmailAuthClass;
}
