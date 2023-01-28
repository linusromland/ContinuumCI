// External dependencies
import { Schema } from 'mongoose';

export const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			validators: [
				{
					validator: (v: string) => {
						return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
					}
				}
			],
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'root'],
			required: true
		},
		verifiedEmail: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);
