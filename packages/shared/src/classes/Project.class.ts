// External dependencies
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsOptional,
	IsString,
	Matches,
	ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { ProjectRoleEnum } from '../enums';
import { UserClass } from './User.class';

export class ProjectClass {
	@IsOptional()
	@IsString()
	_id?: string;

	@IsString()
	name: string;

	@IsOptional()
	@IsBoolean()
	enabled?: boolean;

	@Matches(
		/^(git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|#[-\d\w._]+?)$/
	)
	@IsOptional()
	@IsString()
	gitUrl?: string;

	@IsOptional()
	@IsArray()
	services?: string[];

	@IsOptional()
	@IsString()
	branch?: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PermissionClass)
	permissions?: PermissionClass[];

	@IsOptional()
	@IsDate()
	createdAt?: Date;

	@IsOptional()
	@IsDate()
	updatedAt?: Date;
}

class PermissionClass {
	user: string | UserClass;

	@IsString()
	role: ProjectRoleEnum;
}
