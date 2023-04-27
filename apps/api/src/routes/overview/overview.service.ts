// External dependencies
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import si from 'systeminformation';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import { UserClass } from 'shared/src/classes';
import { DockerService } from 'src/services/docker/docker.service';

@Injectable()
export class OverviewService {
	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>,

		private dockerService: DockerService
	) {}

	async getOverview() {
		const [cpuUsage, cpuCores, mem, network, networkAdapter, dockerInformation, totalProjects] = await Promise.all([
			si.currentLoad(),
			si.cpu(),
			si.mem(),
			si.networkStats(),
			si.networkInterfaceDefault(),
			this.dockerService.getInformation(),
			this.ProjectModel.find({ enabled: true }).select('_id')
		]);

		const networkAdapterIndex = network.findIndex((adapter) => adapter.iface === networkAdapter);

		const runningProjects = await this.dockerService.runningProjects(
			totalProjects.map((project) => project._id.toString())
		);

		const totalContainers = dockerInformation.containerCount;
		const totalImages = dockerInformation.imageCount;

		return {
			success: true,
			message: 'Overview data fetched successfully',
			data: {
				cpuUsage: cpuUsage.currentLoad,
				cpuCores: cpuCores.cores,
				memoryUsage: mem.used,
				memoryTotal: mem.total - mem.swaptotal,
				networkSending: network[networkAdapterIndex || 0]?.tx_sec,
				networkReceiving: network[networkAdapterIndex || 0]?.rx_sec,
				projects: totalProjects.length,
				runningProjects,
				containers: totalContainers,
				images: totalImages
			}
		};
	}
}
