// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { DeploymentsService } from './deployments.service';
import { DeploymentsController } from './deployments.controller';
import { DockerService } from 'src/services/docker/docker.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [DeploymentsController],
	providers: [
		DeploymentsService,
		DockerService,
		...databaseProviders,
		...schemaProviders
	],
	exports: [
		DeploymentsService,
		DockerService,
		...databaseProviders,
		...schemaProviders
	]
})
export class DeploymentsModule {}
