// External dependencies
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { DeploymentsService } from './deployments.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DeploymentQueryClass } from 'shared/src/classes';

@Controller('deployments')
export class DeploymentsController {
	constructor(private readonly deploymentsService: DeploymentsService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createDeployment(
		@Request() req,
		@Body() deploymentQuery: DeploymentQueryClass
	): Promise<ResponseType> {
		return this.deploymentsService.createDeployment(
			req.user.sub,
			deploymentQuery.project
		);
	}

	@UseGuards(JwtAuthGuard)
	@Post('remove')
	async removeDeployment(
		@Request() req,
		@Body() deploymentQuery: DeploymentQueryClass
	): Promise<ResponseType> {
		return this.deploymentsService.removeDeployment(
			req.user.sub,
			deploymentQuery.project
		);
	}
}
