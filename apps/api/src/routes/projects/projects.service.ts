// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import simpleGit from 'simple-git';
import fs from 'fs';
import mongoose from 'mongoose';

// Internal dependencies
import { ProjectClass, ProjectQueryClass } from 'shared/src/classes';
import { ResponseType } from 'shared/src/types';
import { UserClass } from 'shared/src/classes';
import { REPOSITORIES_DIRECTORY } from 'src/utils/env';
import {
	ProjectDeploymentStatus,
	ProjectRoleEnum,
	ProjectSyncStatus,
	UserRoleEnum
} from 'shared/src/enums';
import checkSync from 'src/utils/checkSync';
import { DockerService } from 'src/services/docker/docker.service';
import updateCompose from 'src/utils/updateCompose';

@Injectable()
export class ProjectsService {
	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>,

		private dockerService: DockerService
	) {}

	async getAll(userId: string): Promise<ResponseType<ProjectClass[]>> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		let query = {};

		if (user.role == UserRoleEnum.USER) {
			query = {
				permissions: {
					$elemMatch: {
						user: userId
					}
				}
			};
		}

		const retrievedProjects = await this.ProjectModel.find(query);

		const projects = [];

		const deployStatuses = await this.dockerService.getStatus(
			retrievedProjects.map((project) => project._id.toString())
		);

		for (let i = 0; i < retrievedProjects.length; i++) {
			const project = retrievedProjects[i].toJSON();

			const projectData = {
				...project,
				syncStatus: ProjectSyncStatus.UNKNOWN,
				deploymentStatus:
					deployStatuses[i] || ProjectDeploymentStatus.UNKNOWN
			};

			const inSync = await checkSync(project._id.toString());
			projectData.syncStatus = inSync
				? ProjectSyncStatus.IN_SYNC // In Sync
				: ProjectSyncStatus.OUT_OF_SYNC; // Out of Sync

			projects.push(projectData);
		}

		return {
			success: true,
			message: 'Projects fetched successfully',
			data: projects
		};
	}

	async get(
		userId: string,
		projectId: string
	): Promise<ResponseType<ProjectClass>> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (!mongoose.Types.ObjectId.isValid(projectId)) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		let query = {
			_id: projectId
		} as {
			_id: string;
			permissions?: {
				$elemMatch: {
					user: string;
				};
			};
		};

		if (user.role == UserRoleEnum.USER) {
			query = {
				...query,
				permissions: {
					$elemMatch: {
						user: userId
					}
				}
			};
		}

		const project = await this.ProjectModel.find(query).populate(
			'permissions.user'
		);

		if (!project.length) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		const deployStatus = await this.dockerService.getStatus([projectId]);

		const projectData = {
			...project[0].toJSON(),
			syncStatus: ProjectSyncStatus.UNKNOWN,
			deploymentStatus: deployStatus[0] ?? ProjectDeploymentStatus.UNKNOWN
		};
		projectData.syncStatus = (await checkSync(projectId))
			? ProjectSyncStatus.IN_SYNC // In Sync
			: ProjectSyncStatus.OUT_OF_SYNC; // Out of Sync

		return {
			success: true,
			message: 'Project fetched successfully',
			data: projectData
		};
	}

	async sync(userId: string, projectId: string): Promise<ResponseType> {
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

		if (!['admin', 'root'].includes(user.role)) {
			const user = project.permissions.find(
				(permission) => permission.user.toString() === userId
			);

			if (!user || user.role == ProjectRoleEnum.VIEWER) {
				throw new BadRequestException({
					success: false,
					message: 'Not allowed to sync this project'
				});
			}
		}
		try {
			const git = simpleGit({
				baseDir: `${REPOSITORIES_DIRECTORY}/${projectId}`
			});

			// Discard all changes
			await git.reset(['--hard']);

			// Pull the latest changes
			await git.pull();

			if (!(await updateCompose(project, this.ProjectModel))) {
				throw new BadRequestException({
					success: false,
					message: 'Project sync failed'
				});
			}

			return {
				success: true,
				message: 'Project synced successfully'
			};
		} catch (e) {
			throw new BadRequestException({
				success: false,
				message: 'Project sync failed'
			});
		}
	}

	async create(
		project: ProjectQueryClass,
		userId: string
	): Promise<ResponseType<ProjectClass>> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (!['admin', 'root'].includes(user.role)) {
			throw new BadRequestException({
				success: false,
				message: 'Not allowed to create projects'
			});
		}

		const createdProject = new this.ProjectModel(project);

		createdProject.permissions.push({
			user: userId,
			role: ProjectRoleEnum.OWNER
		});

		// Clone the Git repository
		const cloneGit = simpleGit();
		await cloneGit.clone(
			createdProject.gitUrl,
			`${REPOSITORIES_DIRECTORY}/${createdProject._id}`
		);

		const git = simpleGit(
			`${REPOSITORIES_DIRECTORY}/${createdProject._id}`
		);

		// Get the default branch
		if (!createdProject.branch) {
			const branches = await git.branchLocal();
			createdProject.branch = branches.current;
		} else {
			// Switch to the branch
			await git.checkout(createdProject.branch);
		}

		if (!(await updateCompose(createdProject, this.ProjectModel))) {
			throw new BadRequestException({
				success: false,
				message: 'Project not created'
			});
		}

		await createdProject.save();

		if (!createdProject) {
			throw new BadRequestException({
				success: false,
				message: 'Project not created'
			});
		}

		return {
			success: true,
			message: 'Project created successfully',
			data: createdProject
		};
	}

	async update(
		userId: string,
		projectId: string,
		project: ProjectQueryClass
	): Promise<ResponseType<ProjectClass>> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}

		if (project.gitUrl) {
			throw new BadRequestException({
				success: false,
				message: 'Not allowed to update the Git URL'
			});
		}

		if (project.branch) {
			throw new BadRequestException({
				success: false,
				message: 'Not allowed to update the branch'
			});
		}

		const updatedProject = await this.ProjectModel.findById(projectId);

		if (!updatedProject) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		if (!['admin', 'root'].includes(user.role)) {
			const user = updatedProject.permissions.find(
				(permission) => permission.user.toString() === userId
			);

			if (!user || user.role == ProjectRoleEnum.VIEWER) {
				throw new BadRequestException({
					success: false,
					message: 'Not allowed to update this project'
				});
			}
		}

		const currentOwner = updatedProject.permissions.find(
			(permission) => permission.role === ProjectRoleEnum.OWNER
		);

		const newOwner = project.permissions.find(
			(permission) => permission.role === ProjectRoleEnum.OWNER
		);

		if (
			!currentOwner ||
			!newOwner ||
			currentOwner.user.toString() !== newOwner.user.toString()
		) {
			throw new BadRequestException({
				success: false,
				message: 'Not allowed to change the project owner'
			});
		}

		if (
			project.permissions.filter(
				(permission) => permission.role === ProjectRoleEnum.OWNER
			).length > 1
		) {
			throw new BadRequestException({
				success: false,
				message: 'Only one owner is allowed'
			});
		}

		if (updatedProject) {
			updatedProject.name = project.name;
			updatedProject.permissions = project.permissions;
			await updatedProject.save();
		}

		if (!updatedProject) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		return {
			success: true,
			message: 'Project updated successfully',
			data: updatedProject
		};
	}

	async delete(userId: string, projectId: string): Promise<ResponseType> {
		const user = await this.UserModel.findById(userId);

		if (!user) {
			throw new BadRequestException({
				success: false,
				message: 'User not found'
			});
		}
		const updatedProject = await this.ProjectModel.findById(projectId);

		if (!updatedProject) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		if (!['admin', 'root'].includes(user.role)) {
			const user = updatedProject.permissions.find(
				(permission) => permission.user.toString() === userId
			);

			if (!user || user.role !== ProjectRoleEnum.OWNER) {
				throw new BadRequestException({
					success: false,
					message:
						'Only the owner, Administrators or root can delete the project'
				});
			}
		}

		//TODO: Add remove deployment

		//Remove from the repository directory
		fs.rmSync(`${REPOSITORIES_DIRECTORY}/${updatedProject._id}`, {
			recursive: true,
			force: true
		});

		await updatedProject.remove();

		return {
			success: true,
			message: 'Project deleted successfully'
		};
	}

	async updateRepository(
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

		if (!['admin', 'root'].includes(user.role)) {
			throw new BadRequestException({
				success: false,
				message: 'Not allowed to update projects'
			});
		}

		const project = await this.ProjectModel.findById(projectId);

		if (!project) {
			throw new BadRequestException({
				success: false,
				message: 'Project not found'
			});
		}

		if (user.role !== 'root') {
			const user = project.permissions.find(
				(permission) => permission.user.toString() === userId
			);

			if (!user || user.role == ProjectRoleEnum.VIEWER) {
				throw new BadRequestException({
					success: false,
					message: 'Not allowed to update this project'
				});
			}
		}

		const git = simpleGit(`${REPOSITORIES_DIRECTORY}/${project._id}`);

		await git.pull();

		// TODO: Update deployment

		return {
			success: true,
			message: 'Project updated successfully'
		};
	}
}
