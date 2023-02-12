// External dependencies
import { Schema } from 'mongoose';

export const NginxReloadLogsSchema = new Schema(
	{
		success: {
			type: Boolean,
			required: true
		},
		logs: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);
