// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ContainersController } from './containers.controller';
import { ContainersService } from './containers.service';
import { DockerService } from '../../services/docker/docker.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [ContainersController],
	providers: [ContainersService, DockerService, ...databaseProviders, ...schemaProviders],
	exports: [ContainersService, DockerService, ...databaseProviders, ...schemaProviders]
})
export class ContainersModule {}
