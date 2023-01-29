/* eslint-disable turbo/no-undeclared-env-vars */
// Conifgure dotenv
import { config } from 'dotenv';
config();

export const JWT_SECRET = process.env.JWT_SECRET || 'keyboard cat';
