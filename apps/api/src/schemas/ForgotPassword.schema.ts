// External dependencies
import { Schema } from 'mongoose';

export const ForgotPasswordSchema = new Schema(
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
