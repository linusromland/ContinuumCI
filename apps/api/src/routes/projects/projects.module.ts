// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { DockerService } from 'src/services/docker/docker.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [ProjectsController],
	providers: [ProjectsService, DockerService, ...databaseProviders, ...schemaProviders],
	exports: [ProjectsService, DockerService, ...databaseProviders, ...schemaProviders]
})
export class ProjectsModule {}
