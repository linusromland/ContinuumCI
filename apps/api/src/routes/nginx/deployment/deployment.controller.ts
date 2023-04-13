// External dependencies
import { Body, Controller, Post, UseGuards, Request, ValidationPipe, UsePipes, Get, Query } from '@nestjs/common';

// Internal dependencies
import { DeploymentService } from './deployment.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NginxDeploymentQueryClass } from 'shared/src/classes';

@Controller('nginx/deployments')
export class DeploymentController {
	constructor(private deploymentService: DeploymentService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async get(@Request() req, @Query('id') id: string) {
		return await this.deploymentService.get(req.user.sub, id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Request() req, @Body() body: NginxDeploymentQueryClass) {
		return await this.deploymentService.create(req.user.sub, body);
	}

	@UseGuards(JwtAuthGuard)
	@Post('delete')
	async delete(@Request() req, @Body() body: { id: string }) {
		return await this.deploymentService.delete(req.user.sub, body.id);
	}
}
