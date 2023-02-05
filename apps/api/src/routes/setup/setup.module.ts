// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { databaseProviders, schemaProviders } from '../../providers';
import { EmailConfigurationService } from '../emailConfiguration/emailConfiguration.service';

@Module({
	controllers: [SetupController],
	providers: [SetupService, EmailConfigurationService, ...databaseProviders, ...schemaProviders],
	exports: [SetupService, ...databaseProviders, ...schemaProviders]
})
export class SetupModule {}
