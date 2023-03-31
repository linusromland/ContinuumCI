// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { DomainsController } from './domains.controller';
import { DomainsService } from './domains.service';
import { databaseProviders, schemaProviders } from '../../../providers';

@Module({
	controllers: [DomainsController],
	providers: [DomainsService, ...databaseProviders, ...schemaProviders],
	exports: [DomainsService, ...databaseProviders, ...schemaProviders]
})
export class DomainsModule {}
