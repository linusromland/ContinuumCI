// External dependencies
import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

// Internal dependencies
import { JWT_SECRET } from 'src/utils/env';
import { UserClass } from 'shared/src/classes';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>
	) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();

		const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
		const token = request.headers['authorization'];
		const splitToken = token.split(' ');

		if (splitToken && splitToken.length === 2) {
			const decodedToken = jwt.verify(splitToken[1], JWT_SECRET);

			if (decodedToken && decodedToken.sub) {
				(async () => {
					const user = await this.UserModel.findById(decodedToken.sub);

					if (user) {
						user.lastLogin = new Date();
						user.lastIp = ip;
						await user.save();
					}
				})();
			}
		}
		return super.canActivate(context);
	}

	handleRequest(err, user) {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
