// External dependencies
import { IsArray, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { ProjectDeploymentStatus, ProjectRoleEnum, ProjectSyncStatus } from '../enums';
import { UserClass } from './User.class';
import { MongoBaseClass } from './MongoBase.class';
import { Types } from 'mongoose';

export class ProjectQueryClass {
	@IsString()
	name: string;

	@Matches(/^(git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|#[-\d\w._]+?)$/)
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
}

export class ProjectClass extends MongoBaseClass {
	name: string;
	enabled: boolean;
	gitUrl: string;
	services: ServicesClass[];
	branch: string;
	permissions: PermissionClass[];
	syncStatus: ProjectSyncStatus;
	deploymentStatus: ProjectDeploymentStatus;
	cdToken: string | Types.ObjectId;
}

class PermissionClass {
	user: string | UserClass;

	@IsString()
	role: ProjectRoleEnum;
}

class ServicesClass {
	name: string;
	containerPorts: number[];
	ports: number[];
}
