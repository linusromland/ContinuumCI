// External dependencies
import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { Model } from 'mongoose';
import axios from 'axios';

// Internal dependencies
import { UserClass } from 'shared/src/classes';
import { UserRoleEnum } from 'shared/src/enums';
import { NginxConfigurationType, ResponseType } from 'shared/src/types';
import { NGINX_API_URL } from 'src/utils/env';

@Injectable()
export class ConfigurationService {
	constructor(
		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>
	) {}

	async get(userId: string): Promise<ResponseType<NginxConfigurationType>> {
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
				message: 'Not allowed to get domains'
			});
		}

		const request = await axios.get(`${NGINX_API_URL}/configuration`, {
			validateStatus: () => true
		});

		if (request.status == 500) {
			throw new InternalServerErrorException(request.data);
		}

		if (!request.data.success) {
			throw new BadRequestException(request.data);
		}

		return request.data;
	}

	async edit(
		userId: string,
		nginxConfiguration: NginxConfigurationType
	): Promise<ResponseType> {
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
				message: 'Not allowed to get domains'
			});
		}

		const request = await axios.put(
			`${NGINX_API_URL}/configuration`,
			nginxConfiguration,
			{
				validateStatus: () => true
			}
		);

		if (request.status == 500) {
			throw new InternalServerErrorException(request.data);
		}

		if (!request.data.success) {
			throw new BadRequestException(request.data);
		}

		return request.data;
	}
}
