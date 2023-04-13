// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { DeploymentController } from './deployment.controller';
import { DeploymentService } from './deployment.service';
import { databaseProviders, schemaProviders } from '../../../providers';

@Module({
	controllers: [DeploymentController],
	providers: [DeploymentService, ...databaseProviders, ...schemaProviders],
	exports: [DeploymentService, ...databaseProviders, ...schemaProviders]
})
export class DeploymentModule {}
