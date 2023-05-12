// External dependencies
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Docker from 'dockerode';
import Compose, { IDockerComposeResult } from 'docker-compose';
import fs from 'fs';
import yaml from 'js-yaml';

// Internal dependencies
import { EnvironmentVariablesClass, ProjectClass } from 'shared/src/classes';
import { REPOSITORIES_DIRECTORY, DOCKER_HOST, DOCKER_PORT } from 'src/utils/env';
import { ProjectDeploymentStatus } from 'shared/src/enums';
import { Model } from 'mongoose';
import { ContainerType } from 'shared/src/types';
import { exec } from 'child_process';

@Injectable()
export class DockerService {
	private docker: Docker;

	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>
	) {
		this.docker = new Docker({
			host: `http://${DOCKER_HOST}`,
			port: DOCKER_PORT
		});

		// Check if docker is running
		this.docker.ping();
	}

	async getInformation(): Promise<{
		containerCount: number;
		imageCount: number;
	}> {
		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			return {
				containerCount: 0,
				imageCount: 0
			};
		}

		const containers = await this.docker.listContainers();
		const images = await this.docker.listImages();

		return {
			containerCount: containers.length,
			imageCount: images.length
		};
	}

	async runningProjects(ids: string[]): Promise<number> {
		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			return 0;
		}

		const containers = await this.docker.listContainers();

		const runningProjects = containers.filter((container) => {
			return ids.includes(container.Labels['continuumci.project.id']) && container.State == 'running';
		});

		return runningProjects.length;
	}

	async deployProject(
		project: ProjectClass,
		environmentVariables: EnvironmentVariablesClass[]
	): Promise<IDockerComposeResult[]> {
		const result: IDockerComposeResult[] = [];

		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Docker is not running'
			});
		}

		// Check if the compose has already been deployed (check by the id)
		const containers = await this.docker.listContainers();

		const container = containers.find(
			(container) => container.Labels['continuumci.project.id'] === project._id.toString()
		);

		if (container) {
			await this.ProjectModel.findByIdAndUpdate(project._id, {
				enabled: true
			});

			throw new BadRequestException({
				success: false,
				message: 'The project is already deployed'
			});
		}

		const COMPOSE_FILE_LOCATION = `${REPOSITORIES_DIRECTORY}/${project._id}/docker-compose.yml`;

		// Read in the docker-compose.yml file
		const fileContents = fs.readFileSync(COMPOSE_FILE_LOCATION, 'utf8');

		// Parse the YAML into a JavaScript object
		const dockerCompose = yaml.load(fileContents);

		const services = Object.keys(dockerCompose.services);

		// Loop through each service in the docker-compose file
		for (let i = 0; i < services.length; i++) {
			// Check if the service has an environment variable array
			if (!dockerCompose.services[services[i]].environment) {
				// If not, create one
				dockerCompose.services[services[i]].environment = [];
			}

			// Set the restart policy to always
			dockerCompose.services[services[i]].restart = 'always';

			// Strucutre the environment variables for the docker-compose file
			const variables = environmentVariables
				.filter((variable) => {
					return variable.services.includes(services[i]);
				})
				.map((variable) => {
					return `${variable.name}=${variable.value}`;
				});

			// Concatenate the existing environment variables with the new ones and remove duplicates (own environment variables take precedence)
			dockerCompose.services[services[i]].environment = [
				...dockerCompose.services[services[i]].environment.filter((variable) => !variables.includes(variable)),
				...variables
			];
		}

		// Convert the JavaScript object back to YAML
		const updatedFileContents = yaml.dump(dockerCompose);

		// Write the updated YAML back out to disk
		fs.writeFileSync(COMPOSE_FILE_LOCATION, updatedFileContents);

		try {
			await new Promise((resolve, reject) => {
				// Set the DOCKER_HOST environment variable
				exec(`export DOCKER_HOST=tcp://${DOCKER_HOST}`, (error, stdout, stderr) => {
					if (error) {
						console.log('error', error);
						reject(false);
					}
					if (stderr) {
						console.log('stderr', stderr);
						reject(false);
					}
					console.log('stdout', stdout);
					resolve(true);
				});
			});

			await new Promise((resolve, reject) => {
				// Deploy the project
				const composeCommand = `docker compose -f ${REPOSITORIES_DIRECTORY}/${
					project._id
				}/docker-compose.yml -p ${project.name.replace(/ /g, '_').toLowerCase()} up -d --build`;

				exec(composeCommand, (error, stdout, stderr) => {
					console.log('composeCommand', composeCommand);
					result.push(stdout as undefined as IDockerComposeResult);
					if (error) {
						console.error(`exec error: ${error}`);
						reject(false);
						throw new InternalServerErrorException({
							success: false,
							message: 'Failed to deploy the project',
							data: result
						});
					}
					console.log(`stdout: ${stdout}`);
					console.error(`stderr: ${stderr}`);
					resolve(true);
				});
			});

			return result;
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Failed to deploy the project',
				data: result
			});
		}
	}

	async undeployProject(project: ProjectClass, force: boolean): Promise<IDockerComposeResult[]> {
		const result: IDockerComposeResult[] = [];

		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			if (force) return;

			throw new BadRequestException({
				success: false,
				message: 'Docker is not running'
			});
		}

		// Check if the compose has already been deployed (check by the id)
		const containers = await this.docker.listContainers();

		const container = containers.find(
			(container) => container.Labels['continuumci.project.id'] === project._id.toString()
		);

		if (!container) {
			if (force) return;

			throw new BadRequestException({
				success: false,
				message: 'The project is not deployed'
			});
		}

		try {
			// Deploy the project
			await Compose.down({
				cwd: `${REPOSITORIES_DIRECTORY}/${project._id}`,
				composeOptions: [`-p=${project.name.replace(/ /g, '_').toLowerCase()}`],
				log: true
			}).then(
				// On output, save the output
				(output) => {
					result.push(output);
				},
				// On error
				() => {
					throw new InternalServerErrorException({
						success: false,
						message: 'Failed to undeploy the project',
						data: result
					});
				}
			);

			return result;
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Failed to undeploy the project',
				data: result
			});
		}
	}

	async getStatus(projectIds: string[]): Promise<ProjectDeploymentStatus[]> {
		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			return Array(projectIds.length).fill(ProjectDeploymentStatus.UNKNOWN);
		}

		const result: ProjectDeploymentStatus[] = [];

		for (let i = 0; i < projectIds.length; i++) {
			const projectId = projectIds[i];

			// Check if the compose is deployed (check by the id)
			const containers = await this.docker.listContainers();

			const projectContainers = containers.filter(
				(container) => container.Labels['continuumci.project.id'] === projectId
			);

			if (projectContainers.length === 0) {
				result.push(ProjectDeploymentStatus.NOT_RUNNING);
				continue;
			}

			// Check if all the containers are running
			if (projectContainers.every((container) => container.State === 'running')) {
				result.push(ProjectDeploymentStatus.RUNNING);
				continue;
			}

			// Check if any of the containers are running
			if (projectContainers.some((container) => container.State === 'running')) {
				result.push(ProjectDeploymentStatus.PARTIALLY_RUNNING);
				continue;
			}

			// Check if any of the containers are crashed
			if (projectContainers.some((container) => container.State === 'exited')) {
				result.push(ProjectDeploymentStatus.CRASHED);
				continue;
			}

			// Check if any of the containers are restarting
			if (projectContainers.some((container) => container.State === 'restarting')) {
				result.push(ProjectDeploymentStatus.RESTARTING);
				continue;
			}

			result.push(ProjectDeploymentStatus.UNKNOWN);
		}

		return result;
	}

	async getContainers(projectIds?: string[]) {
		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			return [];
		}

		const containers = await this.docker.listContainers();

		if (projectIds) {
			return containers.filter((container) => projectIds.includes(container.Labels['continuumci.project.id']));
		} else {
			return containers.filter((container) => container.Labels['continuumci.project.id']);
		}
	}

	async getContainer(containerId: string): Promise<ContainerType> {
		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			return null;
		}

		const container = await this.docker.getContainer(containerId);

		const information = await container.inspect();

		const project = await this.ProjectModel.findById(information.Config.Labels['continuumci.project.id']);

		if (!project) {
			throw new BadRequestException({
				success: false,
				message: 'Not a ContinuumCI Container'
			});
		}

		return {
			id: information.Id,
			name: project.name,
			state: information.State.Status,
			created: information.Created
		};
	}

	async getContainerLogs(containerId: string): Promise<string> {
		try {
			await this.docker.ping();
		} catch (error) {
			return 'The docker daemon is not running';
		}

		const container = await this.docker.getContainer(containerId);
		const logs = await container.logs({
			follow: false,
			stdout: true,
			stderr: true
		});

		return logs.toString();
	}
}
