// External dependencies
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Internal dependencies
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JWT_SECRET } from 'src/utils/env';

@Module({
	controllers: [AuthController],
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: JWT_SECRET,
			signOptions: { expiresIn: '7d' }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
