// External dependencies
import { Module } from '@nestjs/common';

// Modules import
import { AuthModule } from './routes/auth/auth.module';
import { EmailConfigurationModule } from './routes/emailConfiguration/emailConfiguration.module';
import { UsersModule } from './routes/users/users.module';
import { WelcomeModule } from './routes/welcome/welcome.module';

@Module({
	imports: [AuthModule, EmailConfigurationModule, UsersModule, WelcomeModule]
})
export class AppModule {}
