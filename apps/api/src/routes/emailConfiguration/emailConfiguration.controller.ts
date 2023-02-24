// External dependencies
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

// Internal dependencies
import { EmailConfigurationType, ResponseType } from 'shared/src/types';
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
		@Body() emailConfiguration: EmailConfigurationType
	): Promise<ResponseType> {
		return this.emailConfigurationService.create(emailConfiguration);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async get(): Promise<ResponseType> {
		return this.emailConfigurationService.get();
	}
}
