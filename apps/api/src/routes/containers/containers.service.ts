// External dependencies
import { BadRequestException, Injectable } from '@nestjs/common';

// Internal dependencies
import { ResponseType } from 'shared/src/types';
import { DockerService } from 'src/services/docker/docker.service';

@Injectable()
export class ContainersService {
	constructor(private dockerService: DockerService) {}

	async getContainers(ids: string[]): Promise<ResponseType<unknown>> {
		try {
			const containers = await this.dockerService.getContainers(ids);

			return {
				success: true,
				message: 'Containers fetched successfully',
				data: containers
			};
		} catch (error) {
			throw new BadRequestException({
				success: false,
				message: 'Failed to fetch containers'
			});
		}
	}
}
