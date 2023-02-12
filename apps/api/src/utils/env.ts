// External dependencies
import { config } from 'dotenv';

// Configure dotenv
config();

export const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ContinuumCI';
export const JWT_SECRET = process.env.JWT_SECRET || 'keyboard cat';
export const API_HOST = process.env.API_HOST || 'http://localhost:3000';
