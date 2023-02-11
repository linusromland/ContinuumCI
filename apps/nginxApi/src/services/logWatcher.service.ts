// External dependencies
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import fs from 'fs';
import path from 'path';

// Internal dependencies
import { NginxLogsType } from 'shared/src/types';
import { NginxResumeType } from '../types';

@Injectable()
export class LogWatcherService {
	private readonly logger = new Logger(LogWatcherService.name);

	constructor(
		@Inject('NGINX_LOGS_MODEL')
		private NginxLogsModel: Model<NginxLogsType>,
		@Inject('NGINX_RESUME_MODEL')
		private NginxResumeModel: Model<NginxResumeType>
	) {
		this.init();
	}

	init() {
		this.logger.log('Watching access.log');
		setInterval(async () => {
			try {
				this.logger.log('Checking for new logs');

				// Read the file
				const file = fs.readFileSync(
					path.join(__dirname, '../access.log'),
					'utf8'
				);

				// Split the file into lines
				const lines = file.split('\n');

				// Get the last line number we saved
				const lineStart = await this.NginxResumeModel.findOne(
					{}
				).select('resume_position');

				// Loop through each line
				for (
					let i = lineStart ? lineStart.resume_position : 0;
					i < lines.length;
					i++
				) {
					const line = lines[i];

					// Skip empty lines
					if (line === '') continue;

					// Save the current line number so we can resume from here next time
					await this.NginxResumeModel.findOneAndUpdate(
						{},
						{ resume_position: i + 1 },
						{ upsert: true }
					);

					// Split the line into parts
					const parts = line.split(' __|__');

					const obj: {
						[key: string]: string;
					} = {};

					// Split each part into key and value
					for (let j = 0; j < parts.length; j++) {
						const part = parts[j];
						const partParts = part.split('__:__');
						obj[partParts[0]] = partParts[1];
					}

					// Save the log
					try {
						const nginx = new this.NginxLogsModel(obj);
						await nginx.save();
						this.logger.log('New nginx log saved');
					} catch (err) {
						this.logger.warn('Error saving nginx log');
					}
				}
			} catch (error) {
				this.logger.error(
					'Something went wrong while watching access.log'
				);
			}
		}, 30000); // Check for new logs every 30 seconds
	}
}
