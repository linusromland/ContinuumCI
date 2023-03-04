// External dependencies
import {
	IsArray,
	IsDate,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { ProjectRoleEnum } from '../enums';

export class ProjectClass {
	@IsString()
	name: string;

	@IsString()
	gitUrl: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PermissionClass)
	permissions: PermissionClass[];

	@IsOptional()
	@IsDate()
	createdAt: Date;

	@IsOptional()
	@IsDate()
	updatedAt: Date;
}

class PermissionClass {
	@IsString()
	user: string;

	@IsString()
	role: ProjectRoleEnum;
}
