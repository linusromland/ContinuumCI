// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { EnvironmentVariablesService } from './environmentVariables.service';
import { EnvironmentVariablesController } from './environmentVariables.controller';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [EnvironmentVariablesController],
	providers: [EnvironmentVariablesService, ...databaseProviders, ...schemaProviders],
	exports: [EnvironmentVariablesService, ...databaseProviders, ...schemaProviders]
})
export class EnvironmentVariablesModule {}
