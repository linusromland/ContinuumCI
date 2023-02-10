// External dependencies
import { Schema } from 'mongoose';

export const NginxConfigurationSchema = new Schema({
	localIps: {
		type: String
	},
	domains: [
		{
			name: {
				type: String
			}
		}
	]
});