// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { LogWatcherService } from './services/logWatcher.service';
import { databaseProviders, schemaProviders } from './providers';

// Modules import
import { WelcomeModule } from './routes/welcome/welcome.module';
import { ConfigurationModule } from './routes/configuration/configuration.module';

@Module({
	imports: [WelcomeModule, ConfigurationModule],
	controllers: [],
	providers: [LogWatcherService, ...databaseProviders, ...schemaProviders],
	exports: [LogWatcherService, ...databaseProviders, ...schemaProviders]
})
export class AppModule {}
