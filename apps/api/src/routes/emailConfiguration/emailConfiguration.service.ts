// External dependencies
import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { Model } from 'mongoose';
import nodemailer from 'nodemailer';
import dayjs from 'dayjs';

// Internal dependencies
import {
	EmailConfigurationResponseType,
	EmailConfigurationType,
	ResponseType
} from 'shared/src/types';
import { API_HOST } from '../../utils/env';
import emailTemplate from '../../utils/emailTemplate';

@Injectable()
export class EmailConfigurationService {
	constructor(
		@Inject('EMAIL_CONFIGURATION_MODEL')
		private EmailConfigurationModel: Model<EmailConfigurationType>
	) {}

	async create(
		emailConfiguration: EmailConfigurationType
	): Promise<ResponseType> {
		try {
			//Verify the email configuration
			if (!(await this.verifyEmailConfiguration(emailConfiguration))) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid email configuration'
				});
			}

			//Save the email configuration
			try {
				await this.EmailConfigurationModel.updateOne(
					{},
					emailConfiguration,
					{ upsert: true }
				);
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

	async verifyEmailConfiguration(
		emailConfiguration: EmailConfigurationType
	): Promise<boolean> {
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
			return true;
		} catch (error) {
			return false;
		}
	}

	async get(): Promise<EmailConfigurationResponseType> {
		return await this.EmailConfigurationModel.findOne()
			.select('-_id -__v -auth.pass')
			.lean();
	}

	async sendVerificationEmail(
		email: string,
		verificationToken: string,
		expires: Date
	): Promise<ResponseType> {
		try {
			const emailConfiguration =
				await this.EmailConfigurationModel.findOne().lean();

			if (!emailConfiguration) {
				throw new InternalServerErrorException({
					success: false,
					message: 'Email configuration not found'
				});
			}

			const transporter = nodemailer.createTransport({
				service: emailConfiguration.service,
				auth: {
					user: emailConfiguration.auth.user,
					pass: emailConfiguration.auth.pass
				}
			});

			await transporter.sendMail({
				from: emailConfiguration.auth.user,
				to: email,
				subject: 'Verify your email',
				html: emailTemplate('verifyAccount', {
					name: email,
					url: `${API_HOST}/users/verify/${verificationToken}`,
					expires: dayjs(expires).format('DD MMMM YYYY HH:mm')
				})
			});

			return {
				success: true,
				message: 'Verification email sent successfully'
			};
		} catch (error) {
			if (error instanceof InternalServerErrorException) {
				throw error;
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}
}
