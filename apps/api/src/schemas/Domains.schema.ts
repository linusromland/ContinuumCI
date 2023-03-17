// External dependencies
import { Schema } from 'mongoose';

export const DomainsSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);
