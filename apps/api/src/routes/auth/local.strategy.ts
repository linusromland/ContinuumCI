// External dependencies
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Internal dependencies
import { AuthService } from './auth.service';
import { UserType } from 'shared/src/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<UserType> {
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
