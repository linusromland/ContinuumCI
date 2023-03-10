// External dependencies
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Internal dependencies
import { AuthService } from './auth.service';
import { UserClass } from 'shared/src/classes';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email'
		});
	}

	async validate(email: string, password: string): Promise<UserClass> {
		const user = await this.authService.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		return user;
	}
}
