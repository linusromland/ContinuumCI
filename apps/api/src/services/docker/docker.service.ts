// External dependencies
import { BadRequestException, Injectable } from '@nestjs/common';
import Docker from 'dockerode';
import Compose from 'docker-compose';
import fs from 'fs';

// Internal dependencies
import { EnvironmentVariablesClass, ProjectClass } from 'shared/src/classes';
import { REPOSITORIES_DIRECTORY } from 'src/utils/env';

@Injectable()
export class DockerService {
	private docker: Docker;

	constructor() {
		this.docker = new Docker();
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

	async deployProject(
		project: ProjectClass,
		environmentVariables: EnvironmentVariablesClass[]
	): Promise<void> {
		// Check if docker is running
		try {
			await this.docker.ping();
		} catch (error) {
			return;
		}

		// Check if the compose has already been deployed (check by the id)
		const containers = await this.docker.listContainers();
		const container = containers.find(
			(container) =>
				container.Labels['com.docker.compose.project'] === project._id
		);

		if (container) {
			throw new BadRequestException({
				success: false,
				message: 'The project is already deployed'
			});
		}

		// Deploy the project
		const result = await Compose.upAll({
			cwd: `${REPOSITORIES_DIRECTORY}/${project._id}`,
			log: true
		}).then(
			(output) => {
				console.log(output);
			},
			(err) => {
				console.log(err);
			}
		);

		console.log(result);

		// const compose = new Compose(
		// 	this.docker,
		// 	`${REPOSITORIES_DIRECTORY}/${project._id}/docker-compose.yml`,
		// 	project._id
		// );
		// console.log(compose);

		// const tmp = await compose.up();

		// console.log(tmp);
	}
}
