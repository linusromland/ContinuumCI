// External dependencies
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { EmailConfigurationQueryClass } from 'shared/src/classes';
import { EmailConfigurationService } from './emailConfiguration.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('emailConfiguration')
export class EmailConfigurationController {
	constructor(
		private readonly emailConfigurationService: EmailConfigurationService
	) {}

	@UseGuards(JwtAuthGuard)
	@Put()
	async create(
		@Body() emailConfiguration: EmailConfigurationQueryClass
	): Promise<ResponseType> {
		return this.emailConfigurationService.create(emailConfiguration);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async get(): Promise<ResponseType> {
		return this.emailConfigurationService.get();
	}
}
