// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ConfigurationModule } from './configuration/configuration.module';
import { DeploymentModule } from './deployment/deployment.module';
import { DomainsModule } from './domains/domains.module';
import { LogsModule } from './logs/logs.module';

@Module({
	imports: [ConfigurationModule, DeploymentModule, DomainsModule, LogsModule]
})
export class NginxModule {}
