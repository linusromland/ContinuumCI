// External dependencies
import { Controller, Post, ValidationPipe } from '@nestjs/common';
import {
	Body,
	Request,
	Param,
	Put,
	UseGuards,
	UsePipes,
	Delete
} from '@nestjs/common/decorators';
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
	createProject(@Request() req, @Body() project: ProjectClass) {
		return this.projectsService.create(project, req.user.sub);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Put('edit/:projectId')
	updateProject(
		@Request() req,
		@Param('projectId') projectId: string,
		@Body() project: ProjectClass
	) {
		return this.projectsService.update(req.user.sub, projectId, project);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:projectId')
	deleteProject(@Request() req, @Param('projectId') projectId: string) {
		return this.projectsService.delete(req.user.sub, projectId);
	}
}
