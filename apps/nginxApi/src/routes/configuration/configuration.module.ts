// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { databaseProviders, schemaProviders } from '../../providers';
import { LogWatcherService } from 'src/services/logWatcher.service';

@Module({
	controllers: [ConfigurationController],
	providers: [ConfigurationService, LogWatcherService, ...databaseProviders, ...schemaProviders],
	exports: [ConfigurationService, ...databaseProviders, ...schemaProviders]
})
export class ConfigurationModule {}
