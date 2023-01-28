// External dependencies
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Internal dependencies
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	imports: [UsersModule, PassportModule],
	providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
