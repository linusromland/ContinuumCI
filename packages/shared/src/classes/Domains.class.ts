// External dependencies
import { IsString } from 'class-validator';

// Internal dependencies
import { MongoBaseClass } from './MongoBase.class';

export class DomainsQueryClass {
	@IsString()
	name: string;
}

export class DomainsClass extends MongoBaseClass {
	name: string;
}
