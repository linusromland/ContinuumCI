// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
	constructor(private setupService: SetupService) {}

	@Get()
	getSetup() {
		return this.setupService.getSetup();
	}
}
