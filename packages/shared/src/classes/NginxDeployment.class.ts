// External dependencies
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Internal dependencies
import { MongoBaseClass } from './MongoBase.class';

class ProjectClass {
	@IsString()
	id: string;

	@IsString()
	service: string;
}

class Location {
	@IsString()
	location: string;

	@IsString()
	proxy_pass: string;

	@IsBoolean()
	websocket: boolean;

	@IsBoolean()
	internal: boolean;

	@IsOptional()
	@Type(() => ProjectClass)
	@ValidateNested()
	project?: ProjectClass;
}

export class NginxDeploymentQueryClass {
	@IsString()
	server_name: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Location)
	locations: Location[];

	@IsBoolean()
	ssl: boolean;
}

export class NginxDeploymentClass extends MongoBaseClass {
	server_name: string;
	locations: Location[];
	ssl: boolean;
}
