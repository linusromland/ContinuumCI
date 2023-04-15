// Vite imports environment variables through import.meta.env. import.meta.env does not import docker variables like process.env does. This file patches this.
import fs from 'fs';

const VITE_ENVIRONMENT_VARIABLES = Object.entries(process.env);
const ENVIRONMENT_VARIABLES_STRING = VITE_ENVIRONMENT_VARIABLES.map((variable) => variable[0] + '=' + variable[1]).join(
	'\n'
);

console.log(`Writing ${VITE_ENVIRONMENT_VARIABLES.length} environment variables to .env file`);

fs.writeFileSync('.env', ENVIRONMENT_VARIABLES_STRING, { encoding: 'utf-8' });
