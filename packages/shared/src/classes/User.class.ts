// External dependencies
import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString
} from 'class-validator';

// Internal dependencies
import { UserRoleEnum } from '../enums';
import { MongoBaseClass } from './MongoBase.class';

export class UserQueryClass {
	@IsString()
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsDate()
	@IsOptional()
	lastLogin: Date;

	@IsString()
	@IsOptional()
	lastIp: string;

	@IsEnum(UserRoleEnum)
	role: UserRoleEnum;

	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	verifiedEmail: boolean;
}

export class UserClass extends MongoBaseClass {
	username: string;
	email: string;
	password: string;
	lastLogin: Date;
	lastIp: string;
	role: UserRoleEnum;
	verifiedEmail: boolean;
}
