// External dependencies
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Internal dependencies
import { WelcomeService } from './welcome.service';
import { WelcomeType } from 'shared/src/types';
import { WelcomeEntity } from './entities/welcome.entity';

@ApiTags('Welcome')
@Controller()
export class WelcomeController {
	constructor(private readonly welcomeService: WelcomeService) {}

	@Get()
	@ApiOperation({ summary: 'Get the welcome message' })
	@ApiResponse({
		status: 200,
		description: 'The welcome message',
		type: WelcomeEntity
	})
	getWelcomeMessage(): WelcomeType {
		return this.welcomeService.getWelcomeMessage();
	}
}
