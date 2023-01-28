// External dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { jwtConstants } from '../../constants/auth';
import { JwtType } from 'shared/src/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret
		});
	}

	async validate(payload: JwtType) {
		return payload;
	}
}
