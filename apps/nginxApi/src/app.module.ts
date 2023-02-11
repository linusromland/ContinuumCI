// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { LogWatcherService } from './services/logWatcher.service';
import { databaseProviders, schemaProviders } from './providers';

// Modules import
import { ConfigurationModule } from './routes/configuration/configuration.module';
import { DeploymentsModule } from './routes/deployments/deployments.module';
import { WelcomeModule } from './routes/welcome/welcome.module';

@Module({
	imports: [ConfigurationModule, DeploymentsModule, WelcomeModule],
	controllers: [],
	providers: [LogWatcherService, ...databaseProviders, ...schemaProviders],
	exports: [LogWatcherService, ...databaseProviders, ...schemaProviders]
})
export class AppModule {}
