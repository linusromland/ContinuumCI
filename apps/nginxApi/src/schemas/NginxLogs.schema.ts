// External dependencies
import { Schema } from 'mongoose';

export const NginxLogsSchema = new Schema(
	{
		remote_address: {
			type: String,
			required: true
		},
		remote_user: {
			type: String,
		},
		time_local: {
			type: String,
			required: true
		},
		request_method: {
			type: String,
			required: true
		},
		request_url: {
			type: String,
			required: true
		},
		request_protocol: {
			type: String,
			required: true
		},
		status: {
			type: Number,
			required: true
		},
		body_bytes_sent: {
			type: Number,
			required: true
		},
		http_referer: {
			type: String,
			required: true
		},
		http_user_agent: {
			type: String,
		},
		http_x_forwarded_for: {
			type: String,
		}
	},
	{
		timestamps: true
	}
);
