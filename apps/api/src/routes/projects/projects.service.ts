// External dependencies
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import simpleGit from 'simple-git';
import fs from 'fs';
import mongoose from 'mongoose';
import yaml from 'js-yaml';
import http from 'http';

// Internal dependencies
import { ProjectClass, ProjectQueryClass } from 'shared/src/classes';
import { ResponseType } from 'shared/src/types';
import { UserClass } from 'shared/src/classes';
import { REPOSITORIES_DIRECTORY } from 'src/utils/env';
import {
	ProjectRoleEnum,
	ProjectSyncStatus,
	UserRoleEnum
} from 'shared/src/enums';
import checkSync from 'src/utils/checkSync';

@Injectable()
export class ProjectsService {
	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>,

		@Inject('PORTS_MODEL')
		private PortsModel: Model<{
			port: number;
		}>
	) {}

	async getAll(userId: string): Promise<ResponseType> {
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

		const projects = await this.ProjectModel.find(query);

		return {
			success: true,
			message: 'Projects fetched successfully',
			data: projects
		};
	}

	async get(userId: string, projectId: string): Promise<ResponseType> {
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

		const projectData = {
			...project[0].toJSON(),
			syncStatus: ProjectSyncStatus.UNKNOWN
		};
		projectData.syncStatus = (await checkSync(projectId))
			? ProjectSyncStatus.IN_SYNC // In Sync
			: ProjectSyncStatus.OUT_OF_SYNC; // Out of Sync

		return {
			success: true,
			message: 'Projects fetched successfully',
			data: projectData
		};
	}

	async create(
		project: ProjectQueryClass,
		userId: string
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

		const COMPOSE_FILE_LOCATION = `${REPOSITORIES_DIRECTORY}/${createdProject._id}/docker-compose.yml`;

		// Read in the docker-compose.yml file
		const fileContents = fs.readFileSync(COMPOSE_FILE_LOCATION, 'utf8');

		// Parse the YAML into a JavaScript object
		const dockerCompose = yaml.load(fileContents);

		const services = Object.keys(dockerCompose.services);

		// Update the services in db
		createdProject.services = services;

		// Loop through each service in the docker-compose file
		for (let i = 0; i < services.length; i++) {
			const service = dockerCompose.services[services[i]];

			// Add label to the service to identify it
			dockerCompose.services[services[i]].labels = [
				...(dockerCompose.services[services[i]].labels || []),
				`continuumci.project.id=${createdProject._id}`
			];

			if (service.ports && service.ports.length) {
				// Loop through each port mapping
				for (let j = 0; j < service.ports.length; j++) {
					const ports = service.ports[j].split(':');

					// Update the host port
					ports[0] = await this.generateUniquePort();

					// Update the port mapping
					dockerCompose.services[services[i]].ports[j] =
						ports.join(':');
				}
			}
		}

		// Convert the JavaScript object back to YAML
		const updatedFileContents = yaml.dump(dockerCompose);

		// Write the updated YAML back out to disk
		fs.writeFileSync(COMPOSE_FILE_LOCATION, updatedFileContents);

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
	): Promise<ResponseType> {
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

	generateUniquePort(): Promise<string> {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve) => {
			// Generate a random port number between 3000 and 10000
			const port = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

			const portTaken = await this.PortsModel.findOne({ port });

			if (portTaken) {
				// If the port is already taken, generate a new one
				this.generateUniquePort().then(resolve);
			}

			// Try to create a server on the port
			const server = http.createServer();

			server.on('error', () => {
				// If an error occurs, the port is not available
				// Generate a new random port and try again
				this.generateUniquePort().then(resolve);
			});

			server.on('listening', () => {
				// If we successfully start listening on the port, immediately close the server
				server.close(() => {
					// The port is available

					// Save the port in the database
					const newPort = new this.PortsModel({ port });
					newPort.save();

					// Return the port
					resolve(String(port));
				});
			});

			server.listen(port);
		});
	}
}
