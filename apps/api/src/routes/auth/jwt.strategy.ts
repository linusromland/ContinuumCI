// External dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { JWT_SECRET } from 'src/utils/env';
import { JwtType } from 'shared/src/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET
		});
	}

	async validate(payload: JwtType) {
		return payload;
	}
}
