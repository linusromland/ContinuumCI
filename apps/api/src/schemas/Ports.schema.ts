// External dependencies
import { Schema } from 'mongoose';

export const PortsSchema = new Schema({
	port: {
		type: Number,
		required: true
	}
});
