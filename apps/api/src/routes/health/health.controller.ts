// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
	constructor(private healthService: HealthService) {}

	@Get()
	healthCheck() {
		return this.healthService.healthCheck();
	}
}
