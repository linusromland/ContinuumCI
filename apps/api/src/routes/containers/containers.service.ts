// External dependencies
import { BadRequestException, Injectable } from '@nestjs/common';

// Internal dependencies
import { ContainerType, ContainerTypeWithLogs, ResponseType } from 'shared/src/types';
import { DockerService } from 'src/services/docker/docker.service';

@Injectable()
export class ContainersService {
	constructor(private dockerService: DockerService) {}

	async getContainers(ids: string[]): Promise<ResponseType<ContainerType[]>> {
		try {
			const containers = await this.dockerService.getContainers(ids);

			return {
				success: true,
				message: 'Containers fetched successfully',
				data: containers.map((container) => ({
					id: container.Id,
					name: container.Names[0].replace('/', ''),
					state: container.State,
					created: container.Created
				}))
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Failed to fetch containers'
			});
		}
	}

	async getContainer(id: string): Promise<ResponseType<ContainerTypeWithLogs>> {
		try {
			const container = await this.dockerService.getContainer(id);
			const logs = await this.dockerService.getContainerLogs(id);

			return {
				success: true,
				message: 'Container fetched successfully',
				data: {
					...container,
					logs
				}
			};
		} catch (error) {
			console.log(error);
			throw new BadRequestException({
				success: false,
				message: 'Failed to fetch container'
			});
		}
	}
}
