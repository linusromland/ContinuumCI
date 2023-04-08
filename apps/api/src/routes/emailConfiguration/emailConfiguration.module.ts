// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { EmailConfigurationService } from './emailConfiguration.service';
import { EmailConfigurationController } from './emailConfiguration.controller';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [EmailConfigurationController],
	providers: [EmailConfigurationService, ...databaseProviders, ...schemaProviders],
	exports: [EmailConfigurationService, ...databaseProviders, ...schemaProviders]
})
export class EmailConfigurationModule {}
