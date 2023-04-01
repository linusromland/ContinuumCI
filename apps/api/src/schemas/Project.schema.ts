// External dependencies
import { Schema } from 'mongoose';

export const ProjectSchema = new Schema(
	{
		running: {
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
						return value.match(
							/^(git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|#[-\d\w._]+?)$/
						);
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
		]
	},
	{
		timestamps: true
	}
);
