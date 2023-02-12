// External dependencies
import { Schema } from 'mongoose';

export const NginxConfigurationSchema = new Schema({
	localIps: {
		type: String,
		required: true
	},
	sitesEnabledLocation: {
		type: String,
		required: true
	},
	accessLogLocation: {
		type: String,
		required: true
	},
	domains: [
		{
			name: {
				type: String,
				required: true
			}
		}
	]
});
