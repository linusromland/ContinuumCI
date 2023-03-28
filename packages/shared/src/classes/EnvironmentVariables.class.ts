// External dependencies
import { IsString, Matches } from 'class-validator';

export class EnvironmentVariablesClass {
	@IsString()
	name: string;

	@IsString()
	value: string;

	@Matches(/^[0-9a-fA-F]{24}$/)
	project: string;
}
