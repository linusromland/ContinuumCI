// External dependencies
import { Connection } from 'mongoose';

// Internal dependencies
import {
	DomainsSchema,
	EmailConfigurationSchema,
	EmailVerificationSchema,
	EnvironmentVariablesSchema,
	ForgotPasswordSchema,
	PortsSchema,
	ProjectSchema,
	UserSchema
} from '../schemas';
import { NginxDeploymentsSchema } from 'shared/src/schemas';

const schemaProviders = [
	{
		provide: 'DOMAINS_MODEL',
		useFactory: (connection: Connection) => connection.model('domains', DomainsSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'EMAIL_CONFIGURATION_MODEL',
		useFactory: (connection: Connection) => connection.model('emailConfigurations', EmailConfigurationSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'EMAIL_VERIFICATION_MODEL',
		useFactory: (connection: Connection) => connection.model('emailVerifications', EmailVerificationSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'ENVIRONMENT_VARIABLES_MODEL',
		useFactory: (connection: Connection) => connection.model('environmentVariables', EnvironmentVariablesSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'FORGOT_PASSWORD_MODEL',
		useFactory: (connection: Connection) => connection.model('forgotPasswords', ForgotPasswordSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'PORTS_MODEL',
		useFactory: (connection: Connection) => connection.model('ports', PortsSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'PROJECT_MODEL',
		useFactory: (connection: Connection) => connection.model('projects', ProjectSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'USER_MODEL',
		useFactory: (connection: Connection) => connection.model('users', UserSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'NGINX_DEPLOYMENTS_MODEL',
		useFactory: (connection: Connection) => connection.model('nginxdeployments', NginxDeploymentsSchema),
		inject: ['DATABASE_CONNECTION']
	}
];

export default schemaProviders;
