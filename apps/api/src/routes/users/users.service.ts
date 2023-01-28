// External dependencies
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { UserType, ResponseType } from 'shared/src/types';

@Injectable()
export class UsersService {
	constructor(
		@Inject('USER_MODEL')
		private UserModel: Model<UserType>
	) {}

	async findOne(username: string): Promise<UserType | undefined> {
		return await this.UserModel.findOne({ username });
	}

	async create(user: UserType): Promise<ResponseType> {
		try {
			const role = (await this.UserModel.countDocuments()) === 0 ? 'root' : 'user';
			const createdUser = new this.UserModel({
				...user,
				role
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

			return {
				success: false,
				message: (error as string | null) || 'Something went wrong'
			};
		}
	}
}
