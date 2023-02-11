// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { DeploymentsService } from './deployments.service';
import { DeploymentsController } from './deployments.controller';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [DeploymentsController],
	providers: [DeploymentsService, ...databaseProviders, ...schemaProviders],
	exports: [DeploymentsService, ...databaseProviders, ...schemaProviders]
})
export class DeploymentsModule {}
