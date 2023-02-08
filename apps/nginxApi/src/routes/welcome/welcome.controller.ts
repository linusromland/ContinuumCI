// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { WelcomeService } from './welcome.service';
import { WelcomeType } from 'shared/src/types';

@Controller()
export class WelcomeController {
	constructor(private readonly welcomeService: WelcomeService) {}

	@Get()
	getWelcomeMessage(): WelcomeType {
		return this.welcomeService.getWelcomeMessage();
	}
}
