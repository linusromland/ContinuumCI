// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [LogsController],
	providers: [LogsService, ...databaseProviders, ...schemaProviders],
	exports: [LogsService, ...databaseProviders, ...schemaProviders]
})
export class LogsModule {}
