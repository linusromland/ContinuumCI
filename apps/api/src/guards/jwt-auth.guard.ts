// External dependencies
import { ExecutionContext, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

// Internal dependencies
import { UserType } from 'shared/src/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	//inject user model
	constructor(@Inject('USER_MODEL') private UserModel: Model<UserType>) {
		super();
	}

	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest(err, user) {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
