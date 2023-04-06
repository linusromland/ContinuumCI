// External dependencies
import { Schema } from 'mongoose';

export const EnvironmentVariablesSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: 'Projects',
			required: true
		},
		name: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		services: [
			{
				type: String
			}
		]
	},
	{
		timestamps: true
	}
);
