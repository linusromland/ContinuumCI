// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { OverviewController } from './overview.controller';
import { OverviewService } from './overview.service';
import { databaseProviders, schemaProviders } from '../../providers';

@Module({
	controllers: [OverviewController],
	providers: [OverviewService, ...databaseProviders, ...schemaProviders],
	exports: [OverviewService, ...databaseProviders, ...schemaProviders]
})
export class OverviewModule {}
