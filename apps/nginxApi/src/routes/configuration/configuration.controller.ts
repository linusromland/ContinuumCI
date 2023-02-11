import { Body, Controller, Get, Put } from '@nestjs/common';

// Internal dependencies
import {
	NginxConfigurationResponseType,
	NginxConfigurationType,
	ResponseType
} from 'shared/src/types';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
	constructor(private readonly configurationService: ConfigurationService) {}

	@Put()
	async edit(
		@Body() nginxConfiguration: NginxConfigurationType
	): Promise<ResponseType> {
		return this.configurationService.edit(nginxConfiguration);
	}

	@Get()
	async get(): Promise<NginxConfigurationResponseType> {
		return this.configurationService.get();
	}
}
