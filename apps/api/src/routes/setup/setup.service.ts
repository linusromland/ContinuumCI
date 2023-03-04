// External dependencies
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmailConfigurationServiceEnum } from 'shared/src/enums';

// Internal dependencies
import { ResponseType, UserType } from 'shared/src/types';
import { EmailConfigurationClass } from 'shared/src/classes';
import { EmailConfigurationService } from '../emailConfiguration/emailConfiguration.service';

@Injectable()
export class SetupService {
	constructor(
		private emailConfigurationService: EmailConfigurationService,

		@Inject('EMAIL_CONFIGURATION_MODEL')
		private EmailConfigurationModel: Model<EmailConfigurationClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserType>
	) {}

	async getSetup(): Promise<ResponseType> {
		const emailConfiguration = await this.EmailConfigurationModel.findOne();
		const verifiedEmailConfiguration =
			emailConfiguration?.service ===
				EmailConfigurationServiceEnum.SKIPPED ||
			(emailConfiguration &&
				(await this.emailConfigurationService.verifyEmailConfiguration(
					emailConfiguration
				))) ||
			false;

		const user = await this.UserModel.findOne({ role: 'root' }).lean();

		return {
			success: true,
			message: 'Setup status fetched successfully',
			data: {
				status:
					verifiedEmailConfiguration && user
						? 'complete'
						: 'incomplete',
				emailConfiguration: verifiedEmailConfiguration,
				rootUser: !!user
			}
		};
	}
}
