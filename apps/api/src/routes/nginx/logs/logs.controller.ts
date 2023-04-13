// External dependencies
import { Controller, Get, UseGuards } from '@nestjs/common';

// Internal dependencies
import { LogsService } from './logs.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('nginx/logs')
export class LogsController {
	constructor(private logsService: LogsService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async get() {
		return await this.logsService.get();
	}
}
