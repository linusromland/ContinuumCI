// External dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connection } from 'mongoose';

// Internal dependencies
import {
	EmailConfigurationSchema,
	EmailVerificationSchema,
	UserSchema
} from '../schemas';

const schemaProviders = [
	{
		provide: 'EMAIL_CONFIGURATION_MODEL',
		useFactory: (connection: Connection) =>
			connection.model('emailConfigurations', EmailConfigurationSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'EMAIL_VERIFICATION_MODEL',
		useFactory: (connection: Connection) =>
			connection.model('emailVerifications', EmailVerificationSchema),
		inject: ['DATABASE_CONNECTION']
	},
	{
		provide: 'USER_MODEL',
		useFactory: (connection: Connection) =>
			connection.model('users', UserSchema),
		inject: ['DATABASE_CONNECTION']
	}
];

export default schemaProviders;
