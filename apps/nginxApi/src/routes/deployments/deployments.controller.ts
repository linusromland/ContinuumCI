import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

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

	@Post('delete')
	async delete(@Body() body: { id: string }) {
		return this.deploymentsService.delete(body.id);
	}
}
