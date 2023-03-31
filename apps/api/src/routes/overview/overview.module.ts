// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { OverviewController } from './overview.controller';
import { OverviewService } from './overview.service';
import { DockerService } from 'src/services/docker/docker.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [OverviewController],
	providers: [
		OverviewService,
		DockerService,
		...databaseProviders,
		...schemaProviders
	],
	exports: [
		OverviewService,
		DockerService,
		...databaseProviders,
		...schemaProviders
	]
})
export class OverviewModule {}
