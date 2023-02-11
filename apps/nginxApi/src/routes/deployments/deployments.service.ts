// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import {
	ResponseType,
	NginxDeploymentResponseType,
	NginxDeploymentType
} from 'shared/src/types';
import template from 'src/utils/template';

@Injectable()
export class DeploymentsService {
	constructor(
		@Inject('NGINX_DEPLOYMENTS_MODEL')
		private NginxDeploymentsModel: Model<NginxDeploymentType>
	) {}

	async create(
		deploymentConfiguration: NginxDeploymentType
	): Promise<ResponseType> {
		try {
			const deployment = new this.NginxDeploymentsModel(
				deploymentConfiguration
			);
			await deployment.save();

			const nginxTemplate = template(
				deploymentConfiguration,
				'EXAMPLE_LOCAL_IPS'
			);
			console.log(nginxTemplate);

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
