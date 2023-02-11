import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query
} from '@nestjs/common';

// Internal dependencies
import {
	NginxDeploymentResponseType,
	NginxDeploymentType,
	ResponseType
} from 'shared/src/types';
import { DeploymentsService } from './deployments.service';

@Controller('deployments')
export class DeploymentsController {
	constructor(private readonly deploymentsService: DeploymentsService) {}

	@Post()
	async create(
		@Body() deploymentConfiguration: NginxDeploymentType
	): Promise<ResponseType> {
		return this.deploymentsService.create(deploymentConfiguration);
	}

	@Get()
	async get(@Query('id') id: string): Promise<NginxDeploymentResponseType> {
		if (!id)
			throw new BadRequestException({
				success: false,
				message: 'No id provided'
			});

		const ids = Array.isArray(id) ? id : [id];
		return this.deploymentsService.get(ids);
	}

	@Delete()
	async delete(@Query('id') id: string): Promise<ResponseType> {
		return this.deploymentsService.delete(id);
	}
}
