// External dependencies
import { Controller, Get, UseGuards } from '@nestjs/common';

// Internal dependencies
import { OverviewService } from './overview.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('overview')
export class OverviewController {
	constructor(private overviewService: OverviewService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getOverview() {
		return await this.overviewService.getOverview();
	}
}
