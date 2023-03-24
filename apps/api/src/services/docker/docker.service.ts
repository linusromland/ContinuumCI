// External dependencies
import { Injectable } from '@nestjs/common';
import Docker from 'dockerode';

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
		const containers = await this.docker.listContainers();
		const images = await this.docker.listImages();

		return {
			containerCount: containers.length,
			imageCount: images.length
		};
	}
}
