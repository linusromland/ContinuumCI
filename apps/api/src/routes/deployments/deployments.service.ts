// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import {
	UserClass,
	EnvironmentVariablesClass,
	ProjectClass
} from 'shared/src/classes';
import { ProjectRoleEnum, UserRoleEnum } from 'shared/src/enums';
import { DockerService } from 'src/services/docker/docker.service';

@Injectable()
export class DeploymentsService {
	constructor(
		private readonly dockerService: DockerService,

		@Inject('ENVIRONMENT_VARIABLES_MODEL')
		private EnvironmentVariablesModel: Model<EnvironmentVariablesClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>,

		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>
	) {}

	async createDeployment(
		userId: string,
		projectId: string
	): Promise<ResponseType> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		const project = await this.ProjectModel.findById(projectId);

		if (!project) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			if (
				project.permissions.some(
					(permission) =>
						permission.user == userId &&
						permission.role == ProjectRoleEnum.VIEWER
				)
			) {
				throw new BadRequestException({
					success: false,
					message:
						'User does not have permission to deploy this project'
				});
			}
		}

		const environmentVariables = await this.EnvironmentVariablesModel.find({
			project: projectId
		});

		this.dockerService.deployProject(project, environmentVariables);

		return {
			success: true,
			message: 'Deployment created'
		};
	}
}
