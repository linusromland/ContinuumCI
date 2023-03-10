// External dependencies
import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString
} from 'class-validator';

// Internal dependencies
import { UserRoleEnum } from '../enums';

export class UserClass {
	@IsString()
	@IsOptional()
	_id: string;

	@IsString()
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsEnum(UserRoleEnum)
	role: UserRoleEnum;

	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	verifiedEmail: boolean;
}
