// External dependencies
import { IsString, ValidateNested } from 'class-validator';

// Internal dependencies
import { EmailConfigurationServiceEnum } from '../enums';
import { MongoBaseClass } from './MongoBase.class';

class EmailAuthClass {
	@IsString()
	user: string;

	@IsString()
	pass: string;
}

export class EmailConfigurationQueryClass {
	@IsString()
	service: EmailConfigurationServiceEnum;

	@ValidateNested()
	auth: EmailAuthClass;
}

export class EmailConfigurationClass extends MongoBaseClass {
	service: EmailConfigurationServiceEnum;
	auth: EmailAuthClass;
}
