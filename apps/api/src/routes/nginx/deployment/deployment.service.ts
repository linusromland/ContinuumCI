// External dependencies
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import axios from 'axios';

// Internal dependencies
import { NginxDeploymentClass, NginxDeploymentQueryClass, UserClass } from 'shared/src/classes';
import { UserRoleEnum } from 'shared/src/enums';
import { NGINX_API_URL } from 'src/utils/env';

@Injectable()
export class DeploymentService {
	constructor(
		@Inject('NGINX_DEPLOYMENTS_MODEL')
		private NginxDeploymentModel: Model<NginxDeploymentClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>
	) {}

	async get(userId: string, id: string) {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		let query = {};

		if (id) {
			if (!isValidObjectId(id)) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid id'
				});
			}

			query = {
				_id: id.toString()
			};
		}

		const deployments = await this.NginxDeploymentModel.find(query);

		if (id && !deployments.length) {
			throw new BadRequestException({
				success: false,
				message: 'Deployment not found'
			});
		}

		return {
			success: true,
			message: 'Successfully fetched deployment(s)',
			data: deployments
		};
	}

	async create(userId: string, body: NginxDeploymentQueryClass) {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			throw new BadRequestException({
				success: false,
				message: 'User does not have permission to add a nginx deployment'
			});
		}

		const createdDeployment = new this.NginxDeploymentModel(body);
		await createdDeployment.save();

		const request = await axios.post(
			`${NGINX_API_URL}/deployments/create`,
			{
				id: createdDeployment._id.toString(),
				email: user.email
			},
			{
				validateStatus: () => true
			}
		);

		if (request.status == 500) {
			await this.NginxDeploymentModel.findByIdAndDelete(createdDeployment._id);

			throw new InternalServerErrorException({
				success: false,
				message: 'Internal server error',
				data: request.data.message
			});
		}

		if (!request.data.success) {
			await this.NginxDeploymentModel.findByIdAndDelete(createdDeployment._id);

			throw new BadRequestException({
				success: false,
				message: request.data.message
			});
		}

		return {
			success: true,
			message: 'Successfully created nginx deployment',
			data: createdDeployment
		};
	}

	async delete(userId: string, id: string) {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			throw new BadRequestException({
				success: false,
				message: 'User does not have permission to delete a nginx deployment'
			});
		}

		const deployment = await this.NginxDeploymentModel.findById(id);

		if (!deployment) {
			throw new BadRequestException({
				success: false,
				message: 'Nginx deployment not found'
			});
		}

		const request = await axios.post(
			`${NGINX_API_URL}/deployments/delete`,
			{
				id: deployment._id.toString()
			},
			{
				validateStatus: () => true
			}
		);

		if (request.status == 500) {
			throw new InternalServerErrorException({
				success: false,
				message: 'Internal server error',
				data: request.data.message
			});
		}

		if (!request.data.success) {
			throw new BadRequestException({
				success: false,
				message: request.data.message
			});
		}

		await this.NginxDeploymentModel.findByIdAndDelete(deployment._id);

		return {
			success: true,
			message: 'Successfully removed nginx deployment'
		};
	}
}
