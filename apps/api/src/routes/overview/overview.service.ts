// External dependencies
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import si from 'systeminformation';

// Internal dependencies
import { ProjectClass } from 'shared/src/classes';
import { UserClass } from 'shared/src/classes';

@Injectable()
export class OverviewService {
	constructor(
		@Inject('PROJECT_MODEL')
		private ProjectModel: Model<ProjectClass>,

		@Inject('USER_MODEL')
		private UserModel: Model<UserClass>
	) {}

	async getOverview() {
		const [cpuUsage, cpuCores, mem, network, networkAdapter] =
			await Promise.all([
				si.currentLoad(),
				si.cpu(),
				si.mem(),
				si.networkStats(),
				si.networkInterfaceDefault()
			]);

		const networkAdapterIndex = network.findIndex(
			(adapter) => adapter.iface === networkAdapter
		);

		const totalProjects = await this.ProjectModel.countDocuments();
		// TODO: Add real running projects count
		const runningProjects = 4;

		// TODO: Add real container count
		const totalContainers = 10;

		// TODO: Add real images count
		const totalImages = 10;

		return {
			success: true,
			message: 'Overview data fetched successfully',
			data: {
				cpuUsage: cpuUsage.currentLoad,
				cpuCores: cpuCores.cores,
				memoryUsage: mem.used,
				memoryTotal: mem.total,
				networkSending: network[networkAdapterIndex || 0].tx_sec,
				networkReceiving: network[networkAdapterIndex || 0].rx_sec,
				projects: totalProjects,
				runningProjects,
				containers: totalContainers,
				images: totalImages
			}
		};
	}
}
