// External dependencies
import { IsOptional, IsString, IsArray, Matches } from 'class-validator';

export class EnvironmentVariablesClass {
	@IsOptional()
	@IsString()
	_id?: string;

	@IsString()
	name: string;

	@IsString()
	value: string;

	@Matches(/^[0-9a-fA-F]{24}$/)
	project: string;

	@IsArray()
	services: string[];
}
