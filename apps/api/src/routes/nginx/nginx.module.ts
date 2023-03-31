// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { ConfigurationModule } from './configuration/configuration.module';
import { DomainsModule } from './domains/domains.module';

@Module({
	imports: [ConfigurationModule, DomainsModule]
})
export class NginxModule {}
