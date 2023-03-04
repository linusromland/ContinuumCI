// External dependencies
import { Controller, Post, ValidationPipe } from '@nestjs/common';
import { Body, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ProjectClass } from 'shared/src/classes';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// Internal dependencies
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
	constructor(private projectsService: ProjectsService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	createProject(@Body() project: ProjectClass) {
		return this.projectsService.create(project);
	}
}
