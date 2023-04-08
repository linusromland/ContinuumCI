// External dependencies
import { config } from 'dotenv';

// Configure dotenv
config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ContinuumCI';
export const JWT_SECRET = process.env.JWT_SECRET || 'keyboard cat';
export const API_HOST = process.env.API_HOST || 'http://localhost:3000';
export const NGINX_API_URL = process.env.NGINX_API_URL || 'http://localhost:3001';
export const REPOSITORIES_DIRECTORY = process.env.REPOSITORIES_DIRECTORY || 'src/repositories';
