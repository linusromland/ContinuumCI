// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { WelcomeService } from './welcome.service';
import { WelcomeController } from './welcome.controller';

@Module({
	controllers: [WelcomeController],
	providers: [WelcomeService]
})
export class WelcomeModule {}
