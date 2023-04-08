// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DeploymentsService } from '../deployments/deployments.service';
import { DockerService } from 'src/services/docker/docker.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [ProjectsController],
	providers: [ProjectsService, DeploymentsService, DockerService, ...databaseProviders, ...schemaProviders],
	exports: [ProjectsService, DeploymentsService, DockerService, ...databaseProviders, ...schemaProviders]
})
export class ProjectsModule {}
