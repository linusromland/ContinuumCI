// External dependencies
import { Injectable, Inject } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';

// Internal dependencies
import { JwtType, UserType, ResponseType } from 'shared/src/types';

@Injectable()
export class UsersService {
	constructor(
		@Inject('USER_MODEL')
		private UserModel: Model<UserType>
	) {}

	async create(user: UserType): Promise<ResponseType> {
		try {
			const role = (await this.UserModel.countDocuments()) === 0 ? 'root' : 'user';
			const createdUser = new this.UserModel({
				...user,
				role,
				verifiedEmail: role === 'root' ? true : false
			});

			await createdUser.save();
			return {
				success: true,
				message: 'User created successfully'
			};
			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		} catch (error: any) {
			//check if error is duplicate key error on username or email
			if (error.code === 11000 && (error.keyPattern['username'] || error.keyPattern['email'])) {
				return {
					success: false,
					message: `${error.keyPattern['username'] ? 'Username' : 'Email'} already in use`
				};
			}

			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				return {
					success: false,
					message: 'Missing required fields'
				};
			}

			return {
				success: false,
				message: (error as string | null) || 'Something went wrong'
			};
		}
	}

	async updateUsername(user: JwtType, newUsername: string): Promise<ResponseType> {
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
				return {
					success: false,
					message: 'Username already in use'
				};
			}

			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				return {
					success: false,
					message: 'Missing required fields'
				};
			}

			return {
				success: false,
				message: (error as string | null) || 'Something went wrong'
			};
		}
	}

	async updatePassword(user: JwtType, oldPassword: string, newPassword: string): Promise<ResponseType> {
		try {
			if (!oldPassword || !newPassword) {
				return {
					success: false,
					message: 'Missing required fields'
				};
			}

			const updatedUser = await this.UserModel.findById(user.sub);
			if (!updatedUser) {
				return {
					success: false,
					message: 'User not found'
				};
			}

			if (updatedUser.password !== oldPassword) {
				return {
					success: false,
					message: 'Old password is incorrect'
				};
			}

			updatedUser.password = newPassword;
			await updatedUser.save();

			return {
				success: true,
				message: 'Password updated successfully'
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			//check if error is validation error for missing required fields
			if (error.name === 'ValidationError') {
				return {
					success: false,
					message: 'Missing required fields'
				};
			}

			return {
				success: false,
				message: (error as string | null) || 'Something went wrong'
			};
		}
	}

	async updateRole(jwtUser: JwtType, userId: string, newRole: string): Promise<ResponseType> {
		try {
			if (isValidObjectId(userId) === false) {
				return {
					success: false,
					message: 'Invalid user id'
				};
			}

			const user = await this.UserModel.findById(jwtUser.sub);

			if (!user || user.role !== 'root') {
				return {
					success: false,
					message: 'Unauthorized'
				};
			}

			if (newRole !== 'user' && newRole !== 'admin') {
				return {
					success: false,
					message: 'Invalid role'
				};
			}

			const updateUser = await this.UserModel.findById(userId);

			if (!updateUser) {
				return {
					success: false,
					message: 'User not found'
				};
			}

			if (updateUser.role === newRole) {
				return {
					success: false,
					message: 'Role is already set to ' + newRole
				};
			}

			if (updateUser.role === 'root') {
				return {
					success: false,
					message: 'Cannot change root role'
				};
			}

			updateUser.role = newRole;
			await updateUser.save();

			return {
				success: true,
				message: 'Role updated successfully'
			};

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return {
				success: false,
				message: (error as string | null) || 'Something went wrong'
			};
		}
	}
}
