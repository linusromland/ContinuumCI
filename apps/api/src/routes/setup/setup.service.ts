// External dependencies
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { EmailConfigurationType, SetupResponseType, ResponseType, UserType } from 'shared/src/types';
import { EmailConfigurationService } from '../emailConfiguration/emailConfiguration.service';

@Injectable()
export class SetupService {
	constructor(
		private emailConfigurationService: EmailConfigurationService,

		@Inject('EMAIL_CONFIGURATION_MODEL')
		private EmailConfigurationModel: Model<EmailConfigurationType>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserType>
	) {}

	async getSetup(): Promise<SetupResponseType> {
		const emailConfiguration = await this.EmailConfigurationModel.findOne();
		const verifiedEmailConfiguration =
			(emailConfiguration &&
				(await this.emailConfigurationService.verifyEmailConfiguration(emailConfiguration))) ||
			false;

		const user = await this.UserModel.findOne({ role: 'root' }).lean();

		return {
			success: true,
			message: 'Setup status fetched successfully',
			status: verifiedEmailConfiguration && user ? 'complete' : 'incomplete',
			emailConfiguration: verifiedEmailConfiguration,
			rootUser: !!user
		};
	}
}
