// External dependencies
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Put
} from '@nestjs/common';
import fs from 'fs';

// Internal dependencies
import { NginxConfigurationType } from 'shared/src/types';
import { ConfigurationService } from './configuration.service';
import argumentValidator from 'src/utils/argumentValidator';

@Controller('configuration')
export class ConfigurationController {
	constructor(private readonly configurationService: ConfigurationService) {}

	@Put()
	async edit(@Body() nginxConfiguration: NginxConfigurationType) {
		try {
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
						argument: 'accessLogLocation',
						type: 'string',
						required: true
					}
				],
				nginxConfiguration
			);

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

		const accessLogLocation = nginxConfiguration.accessLogLocation;

		// Check if the access log location exists, is a file and is writable
		if (
			!fs.existsSync(accessLogLocation) ||
			!fs.lstatSync(accessLogLocation).isFile()
		) {
			throw new BadRequestException({
				success: false,
				message:
					'The access log location does not exist or is not a file'
			});
		}

		try {
			fs.accessSync(accessLogLocation, fs.constants.W_OK);
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'The access log location is not writable'
			});
		}

		return this.configurationService.edit(nginxConfiguration);
	}

	@Get()
	async get() {
		return this.configurationService.get();
	}
}
