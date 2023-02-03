import { Body, Controller, Get, Put } from '@nestjs/common';

// Internal dependencies
import { EmailConfigurationType, ResponseType } from 'shared/src/types';
import { EmailConfigurationService } from './emailConfiguration.service';

@Controller('emailConfiguration')
export class EmailConfigurationController {
	constructor(private readonly emailConfigurationService: EmailConfigurationService) {}

	@Put()
	async create(@Body() emailConfiguration: EmailConfigurationType): Promise<ResponseType> {
		return this.emailConfigurationService.create(emailConfiguration);
	}

	@Get()
	async get(): Promise<ResponseType> {
		return this.emailConfigurationService.get();
	}
}
