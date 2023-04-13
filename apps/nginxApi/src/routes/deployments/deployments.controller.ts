import { BadRequestException, Body, Controller, Delete, Post, Query } from '@nestjs/common';

// Internal dependencies
import { DeploymentsService } from './deployments.service';

@Controller('deployments')
export class DeploymentsController {
	constructor(private readonly deploymentsService: DeploymentsService) {}

	@Post('create')
	async create(@Body() body: { id: string }) {
		const { id } = body;

		if (!id) {
			throw new BadRequestException({
				success: false,
				message: 'No id provided'
			});
		}

		return this.deploymentsService.create(id);
	}

	@Delete()
	async delete(@Query('id') id: string) {
		return this.deploymentsService.delete(id);
	}
}
