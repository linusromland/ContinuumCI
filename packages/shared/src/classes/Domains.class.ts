// External dependencies
import { IsOptional, IsString } from 'class-validator';

export class DomainsClass {
	@IsString()
	@IsOptional()
	_id: string;

	@IsString()
	name: string;
}
