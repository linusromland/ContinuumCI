// External dependencies
import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import {
	UserClass,
	EnvironmentVariablesClass,
	ProjectClass
} from 'shared/src/classes';
import { ProjectRoleEnum, UserRoleEnum } from 'shared/src/enums';

@Injectable()
export class EnvironmentVariablesService {
	constructor(
		@Inject('ENVIRONMENT_VARIABLES_MODEL')
		private EnvironmentVariablesModel: Model<EnvironmentVariablesClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>,

		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>
	) {}

	async get(userId: string, projectId: string): Promise<ResponseType> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			const project = await this.ProjectModel.findOne({
				_id: projectId
			});

			if (!project) {
				throw new BadRequestException({
					success: false,
					message: 'Project not found'
				});
			}

			if (
				!project.permissions.some(
					(permission) =>
						permission.user == userId &&
						permission.role == ProjectRoleEnum.DEVELOPER
				)
			) {
				throw new BadRequestException({
					success: false,
					message: 'You do not have permission to view this project'
				});
			}
		}

		const environmentVariables = await this.EnvironmentVariablesModel.find({
			project: projectId
		});

		return {
			success: true,
			message: 'Environment variables retrieved successfully',
			data: environmentVariables
		};
	}

	async create(
		userId: string,
		environmentVariables: EnvironmentVariablesClass
	): Promise<ResponseType> {
		const user = await this.UserModel.findById(userId);
		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			const project = await this.ProjectModel.findOne({
				_id: environmentVariables.project
			});

			if (!project) {
				throw new BadRequestException({
					success: false,
					message: 'Project not found'
				});
			}

			if (
				!project.permissions.some(
					(permission) =>
						permission.user == userId &&
						permission.role == ProjectRoleEnum.DEVELOPER
				)
			) {
				throw new BadRequestException({
					success: false,
					message:
						'You do not have permission to create environment variables for this project'
				});
			}
		}

		const environmentVariablesExists =
			await this.EnvironmentVariablesModel.findOne({
				userId: userId,
				name: environmentVariables.name,
				project: environmentVariables.project
			});

		if (environmentVariablesExists) {
			throw new BadRequestException({
				success: false,
				message: 'Environment variable already exists for this project'
			});
		}

		if (environmentVariables.services.length == 0) {
			throw new BadRequestException({
				success: false,
				message: 'Please select at least one service'
			});
		}

		const newEnvironmentVariables = new this.EnvironmentVariablesModel({
			userId: userId,
			name: environmentVariables.name,
			value: environmentVariables.value,
			project: environmentVariables.project,
			services: environmentVariables.services
		});

		try {
			await newEnvironmentVariables.save();
		} catch (error) {
			throw new InternalServerErrorException({
				success: false,
				message: 'Failed to create environment variables'
			});
		}

		return {
			success: true,
			message: 'Environment variables created successfully'
		};
	}

	async update(
		userId: string,
		environmentVariables: EnvironmentVariablesClass
	): Promise<ResponseType> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			const project = await this.ProjectModel.findOne({
				_id: environmentVariables.project
			});

			if (!project) {
				throw new BadRequestException({
					success: false,
					message: 'Project not found'
				});
			}

			if (
				!project.permissions.some(
					(permission) =>
						permission.user == userId &&
						permission.role == ProjectRoleEnum.DEVELOPER
				)
			) {
				throw new BadRequestException({
					success: false,
					message:
						'You do not have permission to update environment variables for this project'
				});
			}
		}

		const environmentVariablesExists =
			await this.EnvironmentVariablesModel.findOne({
				name: environmentVariables.name,
				project: environmentVariables.project
			});

		if (!environmentVariablesExists) {
			throw new BadRequestException({
				success: false,
				message: 'Environment variable does not exist for this project'
			});
		}

		try {
			await this.EnvironmentVariablesModel.findOneAndUpdate(
				{
					name: environmentVariables.name,
					project: environmentVariables.project
				},
				{
					$set: {
						value: environmentVariables.value
					}
				}
			);
		} catch (error) {
			throw new InternalServerErrorException({
				success: false,
				message: 'Failed to update environment variables'
			});
		}

		return {
			success: true,
			message: 'Environment variables updated successfully'
		};
	}

	async delete(
		userId: string,
		environmentVariableId: string
	): Promise<ResponseType> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		const environmentVariablesExists =
			await this.EnvironmentVariablesModel.findById(
				environmentVariableId
			);

		if (!environmentVariablesExists) {
			throw new BadRequestException({
				success: false,
				message: 'Environment variable does not exist'
			});
		}

		if (user.role == UserRoleEnum.USER) {
			const project = await this.ProjectModel.findOne({
				_id: environmentVariablesExists.project
			});

			if (!project) {
				throw new BadRequestException({
					success: false,
					message: 'Project not found'
				});
			}

			if (
				!project.permissions.some(
					(permission) =>
						permission.user == userId &&
						permission.role == ProjectRoleEnum.DEVELOPER
				)
			) {
				throw new BadRequestException({
					success: false,
					message:
						'You do not have permission to delete environment variables for this project'
				});
			}
		}

		try {
			await this.EnvironmentVariablesModel.findByIdAndDelete(
				environmentVariableId
			);
		} catch (error) {
			throw new InternalServerErrorException({
				success: false,
				message: 'Failed to delete environment variables'
			});
		}

		return {
			success: true,
			message: 'Environment variables deleted successfully'
		};
	}
}
