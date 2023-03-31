// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { databaseProviders, schemaProviders } from './providers';

// Modules import
import { ConfigurationModule } from './routes/configuration/configuration.module';
import { DeploymentsModule } from './routes/deployments/deployments.module';

@Module({
	imports: [ConfigurationModule, DeploymentsModule],
	controllers: [],
	providers: [...databaseProviders, ...schemaProviders],
	exports: [...databaseProviders, ...schemaProviders]
})
export class AppModule {}
