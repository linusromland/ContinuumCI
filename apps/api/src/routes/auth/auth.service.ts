// External dependencies
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { UserClass } from 'shared/src/classes';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>
	) {}

	async getUser(id: string): Promise<ResponseType> {
		const user: UserClass = await this.UserModel.findById(id).select(
			'-password'
		);

		if (user) {
			return {
				success: true,
				message: 'User found',
				data: {
					_id: user._id,
					username: user.username,
					email: user.email,
					verifiedEmail: user.verifiedEmail,
					role: user.role
				}
			};
		}

		return {
			success: false,
			message: 'User not found'
		};
	}

	async validateUser(email: string, pass: string): Promise<UserClass> {
		const user = await this.UserModel.findOne({ email });

		if (user && user.password === pass) {
			delete user.password;
			return user;
		}
		return null;
	}

	async login(user: UserClass): Promise<ResponseType> {
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
				data: { access_token: token }
			};
		} catch (error) {
			return {
				success: false,
				message: 'Something went wrong'
			};
		}
	}
}
