/**
 * This is used to export the nginx logs to MongoDB
 * It is necessary that the logs are formatted in a specific way.
 * The logs must be formatted like this:
 * "remote_address__:__$remote_addr __|__remote_user__:__$remote_user __|__time_local__:__$time_local __|__request_method__:__$request_method __|__request_url__:__$request_uri __|__request_protocol__:__$server_protocol __|__status__:__$status __|__body_bytes_sent__:__$body_bytes_sent __|__http_referer__:__$http_referer __|__http_user_agent__:__$http_user_agent __|__http_x_forwarded_for__:__$http_x_forwarded_for"
 * 
 * This can be done by adding the following to the nginx config file:

log_format custom_format 'remote_address__:__$remote_addr __|__remote_user__:__$remote_user __|__time_local__:__$time_local __|__request_method__:__$request_method __|__request_url__:__$request_uri __|__request_protocol__:__$server_protocol __|__status__:__$status __|__body_bytes_sent__:__$body_bytes_sent __|__http_referer__:__$http_referer __|__http_user_agent__:__$http_user_agent __|__http_x_forwarded_for__:__$http_x_forwarded_for';
access_log /var/log/nginx/custom.log custom_format;

 *
 * This will export the logs to /var/log/nginx/custom.log
 */


// External dependencies
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Internal dependencies
import { NginxLogsSchema } from 'shared/src/schemas';

(async () => {
	// Connect to MongoDB
	await mongoose.connect('mongodb://127.0.0.1:27017/ContinuumCI');
	mongoose.set("strictQuery", false);

	// Create a model
	const NginxModel = mongoose.model('nginxlogs', NginxLogsSchema);

	const file = fs.readFileSync(path.join(__dirname, '../access.log'), 'utf8');

	const lines = file.split('\n');

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const parts = line.split(' __|__');

		const obj: {
			[key: string]: string;
		} = {};

		for (let j = 0; j < parts.length; j++) {
			const part = parts[j];
			const partParts = part.split('__:__');
			obj[partParts[0]] = partParts[1];
		}

		const nginx = new NginxModel(obj);
		await nginx.save();
		console.log("New nginx log saved")
	}
})();
