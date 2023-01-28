// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [UsersController],
	providers: [UsersService, ...databaseProviders, ...schemaProviders],
	exports: [UsersService, ...databaseProviders, ...schemaProviders]
})
export class UsersModule {}
