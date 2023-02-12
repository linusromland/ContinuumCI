// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import fs from 'fs';
import path from 'path';

// Internal dependencies
import {
	ResponseType,
	NginxDeploymentResponseType,
	NginxDeploymentType,
	NginxConfigurationType
} from 'shared/src/types';
import template from 'src/utils/template';

@Injectable()
export class DeploymentsService {
	constructor(
		@Inject('NGINX_DEPLOYMENTS_MODEL')
		private NginxDeploymentsModel: Model<NginxDeploymentType>,

		@Inject('NGINX_CONFIGURATION_MODEL')
		private NginxConfigurationModel: Model<NginxConfigurationType>
	) {}

	async create(
		deploymentConfiguration: NginxDeploymentType
	): Promise<ResponseType> {
		try {
			const configuration = await this.NginxConfigurationModel.findOne();
			if (!configuration) {
				throw new BadRequestException({
					success: false,
					message: 'No configuration found'
				});
			}

			const deployment = new this.NginxDeploymentsModel(
				deploymentConfiguration
			);
			await deployment.save();

			const nginxTemplate = template(
				deploymentConfiguration,
				configuration.localIps
			);
			
			fs.writeFileSync(
				path.join(
					configuration.sitesEnabledLocation,
					`${deployment._id}.conf`
				),
				nginxTemplate
			);

			return {
				success: true,
				message: 'Deployment created'
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: "Couldn't create deployment"
			});
		}
	}

	async get(ids: string[]): Promise<NginxDeploymentResponseType> {
		if (!ids || ids.length <= 0) {
			throw new BadRequestException({
				success: false,
				message: 'No ids provided'
			});
		}

		try {
			const deployments = await this.NginxDeploymentsModel.find({
				_id: { $in: ids }
			});
			return {
				success: true,
				message: 'Deployments found',
				data: deployments
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: "Couldn't find deployments"
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

		try {
			const deployment = await this.NginxDeploymentsModel.findById(id);

			if (!deployment) {
				throw new BadRequestException({
					success: false,
					message: "Couldn't find deployment"
				});
			}

			await deployment.remove();
			return {
				success: true,
				message: 'Deployment deleted'
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: "Couldn't delete deployment"
			});
		}
	}
}
