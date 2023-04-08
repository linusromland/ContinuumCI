// External dependencies
import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';

// Internal dependencies
import { ContainersService } from './containers.service';

@Controller('containers')
export class ContainersController {
	constructor(private containersService: ContainersService) {}

	@Get()
	getSetup(@Query('ids') ids: string[]) {
		return this.containersService.getContainers(ids);
	}
}
