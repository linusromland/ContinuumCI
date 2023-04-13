// External dependencies
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';

// Internal dependencies
import { NginxLogsType, ResponseType } from 'shared/src/types';

@Injectable()
export class LogsService {
	constructor(
		@Inject('NGINX_LOGS_MODEL')
		private nginxLogsModel: Model<NginxLogsType>
	) {}

	async get(): Promise<ResponseType<NginxLogsType[]>> {
		try {
			// Get the 10 most recent logs from the database
			const logs = await this.nginxLogsModel.find().sort({ _id: -1 }).limit(10);

			return {
				success: true,
				message: 'Successfully retrieved the logs',
				data: logs
			};
		} catch (error) {
			throw new InternalServerErrorException({
				success: false,
				message: 'Failed to retrieve the logs',
				data: error
			});
		}
	}
}
