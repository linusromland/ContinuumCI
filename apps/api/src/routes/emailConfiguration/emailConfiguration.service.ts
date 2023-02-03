// External dependencies
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import nodemailer from 'nodemailer';

// Internal dependencies
import { EmailConfigurationResponseType, EmailConfigurationType, ResponseType } from 'shared/src/types';

@Injectable()
export class EmailConfigurationService {
	constructor(
		@Inject('EMAIL_CONFIGURATION_MODEL')
		private EmailConfigurationModel: Model<EmailConfigurationType>
	) {}

	async create(emailConfiguration: EmailConfigurationType): Promise<ResponseType> {
		try {
			//Test the email configuration
			const transporter = nodemailer.createTransport({
				service: emailConfiguration.service,
				auth: {
					user: emailConfiguration.auth.user,
					pass: emailConfiguration.auth.pass
				}
			});

			try {
				await transporter.verify();
			} catch (error) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid email configuration'
				});
			}

			//Save the email configuration
			try {
				await this.EmailConfigurationModel.updateOne({}, emailConfiguration, { upsert: true });
				return {
					success: true,
					message: 'Email configuration saved successfully'
				};
			} catch (error) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid email configuration'
				});
			}
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}

	async get(): Promise<EmailConfigurationResponseType> {
		return await this.EmailConfigurationModel.findOne().select('-_id -__v -auth.pass').lean();
	}
}
