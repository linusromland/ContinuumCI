// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
	constructor(private logsService: LogsService) {}

	@Get()
	async get() {
		return await this.logsService.get();
	}
}
