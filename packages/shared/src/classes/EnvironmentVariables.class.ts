// External dependencies
import { IsString, IsArray, Matches } from 'class-validator';

// Internal dependencies
import { MongoBaseClass } from './MongoBase.class';

export class EnvironmentVariablesQueryClass {
	@IsString()
	name: string;

	@IsString()
	value: string;

	@Matches(/^[0-9a-fA-F]{24}$/)
	project: string;

	@IsArray()
	services: string[];
}

export class EnvironmentVariablesClass extends MongoBaseClass {
	name: string;
	value: string;
	project: string;
	services: string[];
}
