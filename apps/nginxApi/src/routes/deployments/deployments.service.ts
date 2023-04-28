// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Internal dependencies
import { ResponseType, NginxConfigurationType, NginxReloadLogsType } from 'shared/src/types';
import { NginxDeploymentClass } from 'shared/src/classes';
import template from 'src/utils/template';
import generateSSLCertificate from 'src/utils/generateSSLCertificate';

@Injectable()
export class DeploymentsService {
	constructor(
		@Inject('NGINX_DEPLOYMENTS_MODEL')
		private NginxDeploymentsModel: Model<NginxDeploymentClass>,

		@Inject('NGINX_CONFIGURATION_MODEL')
		private NginxConfigurationModel: Model<NginxConfigurationType>,

		@Inject('NGINX_RELOAD_LOGS_MODEL')
		private NginxReloadLogsModel: Model<NginxReloadLogsType>
	) {}

	async create(id: string): Promise<ResponseType> {
		if (!id) {
			throw new BadRequestException({
				success: false,
				message: 'No id provided'
			});
		}
		const configuration = await this.NginxConfigurationModel.findOne();
		if (!configuration) {
			throw new BadRequestException({
				success: false,
				message: 'No configuration found'
			});
		}

		try {
			const deployment = await this.NginxDeploymentsModel.findById(id);

			if (!deployment) {
				throw new BadRequestException({
					success: false,
					message: "Couldn't find deployment"
				});
			}

			const nginxTemplate = await template(deployment, configuration);

			fs.writeFileSync(path.join(configuration.sitesEnabledLocation, `${deployment._id}.conf`), nginxTemplate);

			const reloadCommand = new Promise((resolve, reject) => {
				exec('nginx -s reload', async (error, _, stderr) => {
					if (error) {
						reject({
							success: false,
							message: 'Nginx failed to reload',
							logs: error
						});
					}

					if (stderr) {
						if (deployment.ssl) {
							await generateSSLCertificate(deployment.server_name, 'linusromland@gmail.com');
						}

						resolve({
							success: true,
							message: 'Deployment created',
							logs: stderr
						});
					}
				});
			});

			const reloadResult = (await reloadCommand) as NginxReloadLogsType;

			const reloadLog = new this.NginxReloadLogsModel(reloadResult);
			await reloadLog.save();

			if (!reloadResult.success) {
				throw new BadRequestException({
					success: reloadResult.success,
					message: reloadResult.message
				});
			}

			return {
				success: reloadResult.success,
				message: reloadResult.message
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: "Couldn't create deployment"
			});
		}
	}

	async delete(id: string): Promise<ResponseType> {
		if (!id) {
			throw new BadRequestException({
				success: false,
				message: 'No id provided'
			});
		}
		const configuration = await this.NginxConfigurationModel.findOne();
		if (!configuration) {
			throw new BadRequestException({
				success: false,
				message: 'No configuration found'
			});
		}

		try {
			const deployment = await this.NginxDeploymentsModel.findById(id);

			if (!deployment) {
				throw new BadRequestException({
					success: false,
					message: "Couldn't find deployment"
				});
			}

			try {
				// Check if file exists before trying to delete it
				if (fs.existsSync(path.join(configuration.sitesEnabledLocation, `${deployment._id}.conf`))) {
					fs.unlinkSync(path.join(configuration.sitesEnabledLocation, `${deployment._id}.conf`));
				}
			} catch (error) {
				console.log(error);
			}

			const reloadCommand = new Promise((resolve, reject) => {
				exec('nginx -s reload', (error, stdout, stderr) => {
					if (error) {
						reject({
							success: false,
							message: 'Deployment deleted, nginx failed to reload',
							logs: error
						});
					}

					if (stderr) {
						resolve({
							success: true,
							message: 'Deployment deleted',
							logs: stderr
						});
					}
				});
			});

			const reloadResult = (await reloadCommand) as NginxReloadLogsType;

			const reloadLog = new this.NginxReloadLogsModel(reloadResult);
			await reloadLog.save();

			if (!reloadResult.success) {
				throw new BadRequestException({
					success: reloadResult.success,
					message: reloadResult.message
				});
			}

			return {
				success: reloadResult.success,
				message: reloadResult.message
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: "Couldn't delete deployment"
			});
		}
	}
}
