// External dependencies
import {
	Controller,
	Post,
	ValidationPipe,
	Body,
	Request,
	Param,
	Put,
	UseGuards,
	UsePipes,
	Delete,
	Get
} from '@nestjs/common';

// Internal dependencies
import { ProjectsService } from './projects.service';
import { ProjectQueryClass } from 'shared/src/classes';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
	constructor(private projectsService: ProjectsService) {}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	getAllProjects(@Request() req) {
		return this.projectsService.getAll(req.user.sub);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':projectId')
	getProject(@Request() req, @Param('projectId') projectId: string) {
		return this.projectsService.get(req.user.sub, projectId);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	createProject(@Request() req, @Body() project: ProjectQueryClass) {
		return this.projectsService.create(project, req.user.sub);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Put('edit/:projectId')
	updateProject(
		@Request() req,
		@Param('projectId') projectId: string,
		@Body() project: ProjectQueryClass
	) {
		return this.projectsService.update(req.user.sub, projectId, project);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:projectId')
	deleteProject(@Request() req, @Param('projectId') projectId: string) {
		return this.projectsService.delete(req.user.sub, projectId);
	}
}
