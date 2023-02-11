// External dependencies
import { Schema } from 'mongoose';

export const NginxDeploymentsSchema = new Schema({
	server_name: {
		type: String,
		required: true
	},
	locations: [
		{
			location: {
				type: String,
				required: true
			},
			proxy_pass: {
				type: String,
				required: true
			},
			websocket: {
				type: Boolean,
				required: true
			},
			internal: {
				type: Boolean,
				required: true
			}
		}
	],
	ssl: {
		type: Boolean,
		required: true
	}
});

