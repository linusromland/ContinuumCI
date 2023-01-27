// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { databaseProviders, schemaProviders } from './providers';

// Modules import
import { WelcomeModule } from './routes/welcome/welcome.module';

@Module({
	imports: [WelcomeModule],
	providers: [...databaseProviders, ...schemaProviders],
	exports: [...databaseProviders, ...schemaProviders]
})
export class AppModule {}
