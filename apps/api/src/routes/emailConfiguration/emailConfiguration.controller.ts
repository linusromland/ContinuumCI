// External dependencies
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

// Internal dependencies
import { EmailConfigurationQueryClass } from 'shared/src/classes';
import { EmailConfigurationService } from './emailConfiguration.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('emailConfiguration')
export class EmailConfigurationController {
	constructor(private readonly emailConfigurationService: EmailConfigurationService) {}

	@UseGuards(JwtAuthGuard)
	@Put()
	async create(@Body() emailConfiguration: EmailConfigurationQueryClass) {
		return this.emailConfigurationService.create(emailConfiguration);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async get() {
		return this.emailConfigurationService.get();
	}
}
