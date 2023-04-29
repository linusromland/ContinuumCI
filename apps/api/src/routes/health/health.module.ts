// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
	controllers: [HealthController],
	providers: [HealthService],
	exports: [HealthService]
})
export class HealthModule {}
