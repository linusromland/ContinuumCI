// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ConfigurationModule } from './configuration/configuration.module';
import { DomainsModule } from './domains/domains.module';
import { LogsModule } from './logs/logs.module';

@Module({
	imports: [ConfigurationModule, DomainsModule, LogsModule]
})
export class NginxModule {}
