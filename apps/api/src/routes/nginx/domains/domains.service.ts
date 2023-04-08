// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { DomainsClass, DomainsQueryClass, UserClass } from 'shared/src/classes';
import { UserRoleEnum } from 'shared/src/enums';
import { ResponseType } from 'shared/src/types';

@Injectable()
export class DomainsService {
	constructor(
		@Inject('DOMAINS_MODEL')
		private DomainsModel: Model<DomainsClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>
	) {}

	async get(userId: string): Promise<ResponseType<DomainsClass[]>> {
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

		const domains = await this.DomainsModel.find();

		return {
			success: true,
			message: 'Domains found successfully',
			data: domains
		};
	}

	async create(userId: string, domain: DomainsQueryClass): Promise<ResponseType<DomainsClass>> {
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

		const createdDomain = new this.DomainsModel(domain);
		await createdDomain.save();

		return {
			success: true,
			message: 'Domain created successfully',
			data: createdDomain
		};
	}

	async delete(userId: string, domainId: string): Promise<ResponseType> {
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
		try {
			const deletedDomain = await this.DomainsModel.findByIdAndDelete(domainId);

			if (!deletedDomain) {
				throw new BadRequestException({
					success: false,
					message: 'Domain not found'
				});
			}

			return {
				success: true,
				message: 'Domain deleted successfully'
			};
		} catch {
			throw new BadRequestException({
				success: false,
				message: 'Domain not found'
			});
		}
	}
}
