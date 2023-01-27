// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { WelcomeModule } from './routes/welcome/welcome.module';

@Module({
	imports: [WelcomeModule]
})
export class AppModule {}
