// External dependencies
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Internal dependencies
import { UsersService } from '../users/users.service';
import { LoginType, UserType } from 'shared/src/types';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async getUser(id: string): Promise<UserType> {
		return await this.usersService.findOneById(id);
	}

	async validateUser(username: string, pass: string): Promise<UserType> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === pass) {
			delete user.password;
			return user;
		}
		return null;
	}

	async login(user: UserType): Promise<LoginType> {
		const payload = {
			username: user.username,
			email: user.email,
			verifiedEmail: user.verifiedEmail,
			sub: user._id
		};
		return {
			access_token: this.jwtService.sign(payload)
		};
	}
}
