// External dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connection } from 'mongoose';

// Internal dependencies
import { NginxLogsSchema, NginxResumeSchema } from '../schemas';


const schemaProviders = [
	{
		provide: 'NGINX_LOGS_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxlogs', NginxLogsSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'NGINX_RESUME_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxresume', NginxResumeSchema),
		inject: ['DATABASE_CONNECTION']
	}
];

export default schemaProviders;
