// External dependencies
import { Schema, model } from 'mongoose';

export const NginxResumeSchema = new Schema(
	{
		resume_position: {
			type: Number,
			required: true
		}
	}
);

export const NginxResumeModel = model('nginxresume', NginxResumeSchema);
