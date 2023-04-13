// External dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connection } from 'mongoose';

// Internal dependencies
import { NginxConfigurationSchema, NginxReloadLogsSchema, NginxResumeSchema, NginxLogsSchema } from '../schemas';
import { NginxDeploymentsSchema } from 'shared/src/schemas';

const schemaProviders = [
	{
		provide: 'NGINX_CONFIGURATION_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxconfiguration', NginxConfigurationSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'NGINX_DEPLOYMENTS_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxdeployments', NginxDeploymentsSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'NGINX_LOGS_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxlogs', NginxLogsSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'NGINX_RELOAD_LOGS_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxreloadlogs', NginxReloadLogsSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'NGINX_RESUME_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxresume', NginxResumeSchema),
		inject: ['DATABASE_CONNECTION']
	}
];

export default schemaProviders;
