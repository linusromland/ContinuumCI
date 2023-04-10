// External dependencies
import { Controller, Get } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators/http/route-params.decorator';

// Internal dependencies
import { ContainersService } from './containers.service';

@Controller('containers')
export class ContainersController {
	constructor(private containersService: ContainersService) {}

	@Get()
	getContainers(@Query('ids') ids: string[]) {
		return this.containersService.getContainers(ids);
	}

	@Get(':id')
	getContainer(@Param('id') id: string) {
		return this.containersService.getContainer(id);
	}
}
