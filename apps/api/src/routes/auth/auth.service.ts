// External dependencies
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

// Internal dependencies
import {
	LoginResponseType,
	UserResponseType,
	UserType,
	ResponseType
} from 'shared/src/types';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject('USER_MODEL')
		private UserModel: Model<UserType>
	) {}

	async getUser(id: string): Promise<UserResponseType | ResponseType> {
		const user: UserType = await this.UserModel.findById(id).select(
			'-password'
		);

		if (user) {
			return {
				success: true,
				message: 'User found',
				_id: user._id,
				username: user.username,
				email: user.email,
				verifiedEmail: user.verifiedEmail,
				role: user.role
			};
		}

		return {
			success: false,
			message: 'User not found'
		};
	}

	async validateUser(email: string, pass: string): Promise<UserType> {
		const user = await this.UserModel.findOne({ email });

		if (user && user.password === pass) {
			delete user.password;
			return user;
		}
		return null;
	}

	async login(user: UserType): Promise<LoginResponseType> {
		const payload = {
			username: user.username,
			email: user.email,
			verifiedEmail: user.verifiedEmail,
			sub: user._id
		};
		try {
			const token = this.jwtService.sign(payload);
			return {
				success: true,
				message: 'Login successful',
				access_token: token
			};
		} catch (error) {
			return {
				success: false,
				message: 'Something went wrong'
			};
		}
	}
}
