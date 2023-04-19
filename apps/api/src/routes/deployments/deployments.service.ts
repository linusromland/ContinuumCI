// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { UserClass, EnvironmentVariablesClass, ProjectClass } from 'shared/src/classes';
import { ProjectRoleEnum, UserRoleEnum } from 'shared/src/enums';
import { DockerService } from 'src/services/docker/docker.service';
import { IDockerComposeResult } from 'docker-compose';

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

	async createDeployment(userId: string, projectId: string): Promise<ResponseType<IDockerComposeResult[]>> {
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
					(permission) => permission.user == userId && permission.role == ProjectRoleEnum.VIEWER
				)
			) {
				throw new BadRequestException({
					success: false,
					message: 'User does not have permission to deploy this project'
				});
			}
		}

		const environmentVariables = await this.EnvironmentVariablesModel.find({
			project: projectId
		});

		const result = await this.dockerService.deployProject(project, environmentVariables);

		await this.ProjectModel.findByIdAndUpdate(projectId, {
			$set: {
				enabled: true
			}
		});

		return {
			success: true,
			message: 'Deployment created',
			data: result
		};
	}

	async removeDeployment(
		userId: string,
		projectId: string,
		force = false
	): Promise<ResponseType<IDockerComposeResult[]>> {
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
					(permission) => permission.user == userId && permission.role == ProjectRoleEnum.VIEWER
				)
			) {
				throw new BadRequestException({
					success: false,
					message: 'User does not have permission to undeploy this project'
				});
			}
		}

		const result = await this.dockerService.undeployProject(project, force);

		await this.ProjectModel.findByIdAndUpdate(projectId, {
			$set: {
				enabled: false
			}
		});

		return {
			success: true,
			message: 'Deployment removed',
			data: result
		};
	}
}
