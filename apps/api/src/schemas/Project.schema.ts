// External dependencies
import { Schema, Types } from 'mongoose';

export const ProjectSchema = new Schema(
	{
		enabled: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			required: true
		},
		gitUrl: {
			type: String,
			required: true,
			validators: [
				{
					validator: (value: string) => {
						// Check if the URL is a valid git URL
						return value.match(/^(git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|#[-\d\w._]+?)$/);
					}
				}
			]
		},
		branch: {
			type: String
		},
		permissions: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'users'
				},
				role: {
					type: String,
					enum: ['owner', 'developer', 'viewer'],
					default: 'viewer'
				}
			}
		],
		services: [
			{
				name: {
					type: String,
					required: true
				},
				containerPorts: [
					{
						type: Number
					}
				],
				ports: [
					{
						type: Number
					}
				]
			}
		],
		cdToken: {
			type: Types.ObjectId,
			default: new Types.ObjectId(),
			unique: true
		}
	},
	{
		timestamps: true
	}
);
