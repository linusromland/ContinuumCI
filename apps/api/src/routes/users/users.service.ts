// External dependencies
import {
	Injectable,
	Inject,
	BadRequestException,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import dayjs from 'dayjs';

// Internal dependencies
import { JwtType, ResponseType, EmailVerificationType } from 'shared/src/types';
import { UserClass } from 'shared/src/classes';
import { EmailConfigurationClass } from 'shared/src/classes';
import { EmailConfigurationService } from '../emailConfiguration/emailConfiguration.service';
import { UserRoleEnum } from 'shared/src/enums';

@Injectable()
export class UsersService {
	constructor(
		private emailConfigurationService: EmailConfigurationService,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>,

		@Inject('EMAIL_VERIFICATION_MODEL')
		private EmailVerificationModel: Model<EmailVerificationType>,

		@Inject('EMAIL_CONFIGURATION_MODEL')
		private EmailConfigurationModel: Model<EmailConfigurationClass>
	) {}

	async create(user: UserClass): Promise<ResponseType> {
		try {
			const role =
				(await this.UserModel.countDocuments()) === 0
					? UserRoleEnum.ROOT
					: UserRoleEnum.USER;
			const createdUser = new this.UserModel({
				...user,
				role,
				verifiedEmail: role === UserRoleEnum.ROOT ? true : false
			});

			if (!createdUser.verifiedEmail) {
				if (
					!(await this.EmailConfigurationModel.countDocuments({
						service: { $ne: 'skipped' }
					}))
				) {
					createdUser.verifiedEmail = true;
				} else {
					const emailVerification = new this.EmailVerificationModel({
						user: createdUser._id
					});

					await emailVerification.save();

					// Send email verification email
					await this.emailConfigurationService.sendVerificationEmail(
						createdUser.email,
						emailVerification._id,
						dayjs(emailVerification.createdAt)
							.add(30, 'minutes')
							.toDate()
					);
				}
			}

			await createdUser.save();
			return {
				success: true,
				message: 'User created successfully'
			};
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		} catch (error: any) {
			//check if error is duplicate key error on username or email
			if (
				error.code === 11000 &&
				(error.keyPattern['username'] || error.keyPattern['email'])
			) {
				throw new BadRequestException({
					success: false,
					message: `${
						error.keyPattern['username'] ? 'Username' : 'Email'
					} already in use`
				});
			}

			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				throw new BadRequestException({
					success: false,
					message: 'Missing required fields'
				});
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}

	async verifyUser(verificationId: string) {
		try {
			const emailVerification =
				await this.EmailVerificationModel.findById(verificationId);
			if (!emailVerification) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid verification id'
				});
			}

			const user = await this.UserModel.findById(emailVerification.user);
			if (!user) {
				throw new BadRequestException({
					success: false,
					message: 'User not found'
				});
			}

			await emailVerification.remove();

			// Check if verification link is expired (30 minutes old or more)
			if (
				dayjs(emailVerification.createdAt)
					.add(30, 'minutes')
					.isBefore(dayjs())
			) {
				throw new UnauthorizedException({
					success: false,
					message: 'Verification link expired'
				});
			}

			user.verifiedEmail = true;
			await user.save();

			return {
				success: true,
				message: 'User verified successfully'
			};
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error instanceof BadRequestException) {
				throw error;
			}

			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				throw new BadRequestException({
					success: false,
					message: 'Missing required fields'
				});
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}

	async updateUsername(
		user: JwtType,
		newUsername: string
	): Promise<ResponseType> {
		try {
			const updatedUser = await this.UserModel.findById(user.sub);
			if (!updatedUser) {
				return {
					success: false,
					message: 'User not found'
				};
			}

			updatedUser.username = newUsername;
			await updatedUser.save();

			return {
				success: true,
				message: 'Username updated successfully'
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			//check if error is duplicate key error on username or email
			if (error.code === 11000 && error.keyPattern['username']) {
				throw new BadRequestException({
					success: false,
					message: 'Username already in use'
				});
			}

			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				throw new BadRequestException({
					success: false,
					message: 'Missing required fields'
				});
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}

	async updatePassword(
		user: JwtType,
		oldPassword: string,
		newPassword: string
	): Promise<ResponseType> {
		try {
			if (!oldPassword || !newPassword) {
				throw new BadRequestException({
					success: false,
					message: 'Missing required fields'
				});
			}

			const updatedUser = await this.UserModel.findById(user.sub);
			if (!updatedUser) {
				throw new BadRequestException({
					success: false,
					message: 'User not found'
				});
			}

			if (updatedUser.password !== oldPassword) {
				throw new BadRequestException({
					success: false,
					message: 'Incorrect password'
				});
			}

			updatedUser.password = newPassword;
			await updatedUser.save();

			return {
				success: true,
				message: 'Password updated successfully'
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error instanceof BadRequestException) {
				throw error;
			}

			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				throw new BadRequestException({
					success: false,
					message: 'Missing required fields'
				});
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}

	async updateRole(
		jwtUser: JwtType,
		userId: string,
		newRole: string
	): Promise<ResponseType> {
		try {
			if (isValidObjectId(userId) === false) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid user id'
				});
			}

			const user = await this.UserModel.findById(jwtUser.sub);

			if (!user || user.role !== UserRoleEnum.ROOT) {
				throw new UnauthorizedException({
					success: false,
					message: 'Unauthorized'
				});
			}

			if (
				newRole !== UserRoleEnum.USER &&
				newRole !== UserRoleEnum.ADMIN
			) {
				throw new BadRequestException({
					success: false,
					message: 'Invalid role'
				});
			}

			const updateUser = await this.UserModel.findById(userId);

			if (!updateUser) {
				throw new BadRequestException({
					success: false,
					message: 'User not found'
				});
			}

			if (updateUser.role === newRole) {
				throw new BadRequestException({
					success: false,
					message: 'User already set to ' + newRole
				});
			}

			if (updateUser.role === 'root') {
				throw new BadRequestException({
					success: false,
					message: 'Cannot change root user role'
				});
			}

			updateUser.role = newRole;
			await updateUser.save();

			return {
				success: true,
				message: 'Role updated successfully'
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error instanceof BadRequestException) {
				throw error;
			}

			throw new InternalServerErrorException({
				success: false,
				message: (error as string | null) || 'Something went wrong'
			});
		}
	}
}
