// External dependencies
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import Docker from 'dockerode';
import Compose from 'docker-compose';
import fs from 'fs';
import yaml from 'js-yaml';

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
			throw new BadRequestException({
				success: false,
				message: 'Docker is not running'
			});
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

			// Strucutre the environment variables for the docker-compose file
			const variables = environmentVariables.map((variable) => {
				return `${variable.name}=${variable.value}`;
			});

			// Concatenate the existing environment variables with the new ones and remove duplicates (own environment variables take precedence)
			dockerCompose.services[services[i]].environment = [
				...dockerCompose.services[services[i]].environment.filter(
					(variable) => !variables.includes(variable)
				),
				...variables
			];
		}

		// Convert the JavaScript object back to YAML
		const updatedFileContents = yaml.dump(dockerCompose);

		// Write the updated YAML back out to disk
		fs.writeFileSync(COMPOSE_FILE_LOCATION, updatedFileContents);

		try {
			// Deploy the project
			await Compose.upAll({
				cwd: `${REPOSITORIES_DIRECTORY}/${project._id}`,
				log: true
			}).then(
				// On output, do nothing
				() => null,
				// On error
				() => {
					throw new InternalServerErrorException({
						success: false,
						message: 'Failed to deploy the project'
					});
				}
			);
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Failed to deploy the project'
			});
		}
	}
}
