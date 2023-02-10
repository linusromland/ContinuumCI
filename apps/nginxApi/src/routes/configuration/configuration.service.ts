// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { ResponseType, NginxConfigurationType, NginxConfigurationResponseType } from 'shared/src/types';

@Injectable()
export class ConfigurationService {
	constructor(
		@Inject('NGINX_CONFIGURATION_MODEL')
		private NginxConfigurationModel: Model<NginxConfigurationType>
	) {}

	async edit(nginxConfiguration: NginxConfigurationType): Promise<ResponseType> {
		try {
			await this.NginxConfigurationModel.updateOne({}, nginxConfiguration, { upsert: true });

			return {
				success: true,
				message: 'Nginx configuration updated successfully'
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Error creating nginx configuration'
			});
		}
	}

	async get(): Promise<NginxConfigurationResponseType> {
		try {
			const nginxConfiguration = await this.NginxConfigurationModel.findOne({});

			return {
				success: true,
				message: 'Nginx configuration',
				localIps: nginxConfiguration.localIps,
				domains: nginxConfiguration.domains
			};
			
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Error getting nginx configuration'
			});
		}
	}
}
