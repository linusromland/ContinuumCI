// External dependencies
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

// Internal dependencies
import { databaseProviders, schemaProviders } from './providers';
import { NestLogger } from 'shared/src/middlewares';

// Modules import
import { ConfigurationModule } from './routes/configuration/configuration.module';
import { DeploymentsModule } from './routes/deployments/deployments.module';
import { HealthModule } from './routes/health/health.module';
import { LogsModule } from './routes/logs/logs.module';

@Module({
	imports: [ConfigurationModule, DeploymentsModule, HealthModule, LogsModule],
	controllers: [],
	providers: [...databaseProviders, ...schemaProviders],
	exports: [...databaseProviders, ...schemaProviders]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(NestLogger).forRoutes('*');
	}
}
