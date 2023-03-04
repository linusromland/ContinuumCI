// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [ProjectsController],
	providers: [ProjectsService, ...databaseProviders, ...schemaProviders],
	exports: [ProjectsService, ...databaseProviders, ...schemaProviders]
})
export class ProjectsModule {}
