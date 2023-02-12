// External dependencies
import { BadRequestException, Body, Controller, Get, Put } from '@nestjs/common';
import fs from 'fs';

// Internal dependencies
import {
	NginxConfigurationResponseType,
	NginxConfigurationType,
	ResponseType
} from 'shared/src/types';
import { ConfigurationService } from './configuration.service';
import argumentValidator from 'src/utils/argumentValidator';

@Controller('configuration')
export class ConfigurationController {
	constructor(private readonly configurationService: ConfigurationService) {}

	@Put()
	async edit(
		@Body() nginxConfiguration: NginxConfigurationType
	): Promise<ResponseType> {
		try{
			argumentValidator(
			[
				{
					argument: 'localIps',
					type: 'string',
					required: true
				},
				{
					argument: 'sitesEnabledLocation',
					type: 'string',
					required: true
				},
				{
					argument: 'domains',
					type: 'object',
					required: true,
					array: true
				}
			],
			nginxConfiguration
		)
	
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new BadRequestException({
				success: false,
				message: error.message
			});
		}

		const sitesEnabledLocation = nginxConfiguration.sitesEnabledLocation;
		// Check if the sites-enabled location exists, is a directory and is writable
		if (
			!fs.existsSync(sitesEnabledLocation) ||
			!fs.lstatSync(sitesEnabledLocation).isDirectory()
		) {
			throw new BadRequestException({
				success: false,
				message:
					'The sites-enabled location does not exist or is not a directory'
			});
		}

		try {
			fs.accessSync(sitesEnabledLocation, fs.constants.W_OK);
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'The sites-enabled location is not writable'
			});
		}

		return this.configurationService.edit(nginxConfiguration);
	}

	@Get()
	async get(): Promise<NginxConfigurationResponseType> {
		return this.configurationService.get();
	}
}
