// External dependencies
import { Schema } from 'mongoose';

export const EmailVerificationSchema = new Schema(
	{
		user: {
			ref: 'User',
			type: Schema.Types.ObjectId,
			required: true
		}
	},
	{
		timestamps: true
	}
);
