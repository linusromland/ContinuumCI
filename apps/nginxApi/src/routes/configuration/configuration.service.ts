// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { ResponseType, NginxConfigurationType } from 'shared/src/types';
import { LogWatcherService } from 'src/services/logWatcher.service';

@Injectable()
export class ConfigurationService {
	constructor(
		@Inject('NGINX_CONFIGURATION_MODEL')
		private NginxConfigurationModel: Model<NginxConfigurationType>,

		private readonly logWatcherService: LogWatcherService
	) {}

	async edit(
		nginxConfiguration: NginxConfigurationType
	): Promise<ResponseType> {
		try {
			await this.NginxConfigurationModel.updateOne(
				{},
				nginxConfiguration,
				{ upsert: true }
			);

			await this.logWatcherService.startLogWatcher();

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

	async get(): Promise<ResponseType> {
		try {
			const nginxConfiguration =
				await this.NginxConfigurationModel.findOne({});

			return {
				success: true,
				message: 'Nginx configuration',
				data: {
					localIps: nginxConfiguration.localIps,
					sitesEnabledLocation:
						nginxConfiguration.sitesEnabledLocation,
					accessLogLocation: nginxConfiguration.accessLogLocation
				}
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Error getting nginx configuration'
			});
		}
	}
}
