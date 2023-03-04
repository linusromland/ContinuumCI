// External dependencies
import {
	IsArray,
	IsDate,
	IsOptional,
	IsString,
	Matches,
	ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { ProjectRoleEnum } from '../enums';

export class ProjectClass {
	@IsString()
	name: string;

	@Matches(
		/^(git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|#[-\d\w._]+?)$/
	)
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
