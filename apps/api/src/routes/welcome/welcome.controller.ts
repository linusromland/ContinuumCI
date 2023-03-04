// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { WelcomeService } from './welcome.service';
import { ResponseType } from 'shared/src/types';

@Controller()
export class WelcomeController {
	constructor(private readonly welcomeService: WelcomeService) {}

	@Get()
	getWelcomeMessage(): ResponseType {
		return this.welcomeService.getWelcomeMessage();
	}
}
