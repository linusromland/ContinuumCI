// External dependencies
import { Module } from '@nestjs/common';

// Modules import
import { AuthModule } from './routes/auth/auth.module';
import { EmailConfigurationModule } from './routes/emailConfiguration/emailConfiguration.module';
import { SetupModule } from './routes/setup/setup.module';
import { UsersModule } from './routes/users/users.module';
import { WelcomeModule } from './routes/welcome/welcome.module';

@Module({
	imports: [
		AuthModule,
		EmailConfigurationModule,
		SetupModule,
		UsersModule,
		WelcomeModule
	]
})
export class AppModule {}
