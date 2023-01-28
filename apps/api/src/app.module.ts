// External dependencies
import { Module } from '@nestjs/common';

// Modules import
import { WelcomeModule } from './routes/welcome/welcome.module';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';

@Module({
	imports: [WelcomeModule, AuthModule, UsersModule]
})
export class AppModule {}
