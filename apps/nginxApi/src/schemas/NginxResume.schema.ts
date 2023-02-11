// External dependencies
import { Schema } from 'mongoose';

export const NginxResumeSchema = new Schema({
	resume_position: {
		type: Number,
		required: true
	}
});
