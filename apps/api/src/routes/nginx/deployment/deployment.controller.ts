// External dependencies
import { Body, Controller, Post, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';

// Internal dependencies
import { DeploymentService } from './deployment.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NginxDeploymentQueryClass } from 'shared/src/classes';

@Controller('nginx/deployments')
export class DeploymentController {
	constructor(private deploymentService: DeploymentService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Request() req, @Body() body: NginxDeploymentQueryClass) {
		return await this.deploymentService.create(req.user.sub, body);
	}
}
