// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { databaseProviders, schemaProviders } from '../../../providers';

@Module({
	controllers: [ConfigurationController],
	providers: [ConfigurationService, ...databaseProviders, ...schemaProviders],
	exports: [ConfigurationService, ...databaseProviders, ...schemaProviders]
})
export class ConfigurationModule {}
