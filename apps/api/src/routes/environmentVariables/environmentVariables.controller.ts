// External dependencies
import {
	Body,
	Controller,
	Request,
	Put,
	UseGuards,
	Post,
	Delete,
	Param,
	Get
} from '@nestjs/common';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { EnvironmentVariablesQueryClass } from 'shared/src/classes';
import { EnvironmentVariablesService } from './environmentVariables.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('environmentVariables')
export class EnvironmentVariablesController {
	constructor(
		private readonly environmentVariablesService: EnvironmentVariablesService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get(':projectId')
	async get(
		@Request() req,
		@Param('projectId') projectId: string
	): Promise<ResponseType> {
		return this.environmentVariablesService.get(req.user.sub, projectId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@Request() req,
		@Body() environmentVariables: EnvironmentVariablesQueryClass
	): Promise<ResponseType> {
		return this.environmentVariablesService.create(
			req.user.sub,
			environmentVariables
		);
	}

	@UseGuards(JwtAuthGuard)
	@Put()
	async update(
		@Request() req,
		@Body() environmentVariables: EnvironmentVariablesQueryClass
	): Promise<ResponseType> {
		return this.environmentVariablesService.update(
			req.user.sub,
			environmentVariables
		);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':environmentVariableId')
	async delete(
		@Request() req,
		@Param('environmentVariableId') environmentVariableId: string
	): Promise<ResponseType> {
		return this.environmentVariablesService.delete(
			req.user.sub,
			environmentVariableId
		);
	}
}
