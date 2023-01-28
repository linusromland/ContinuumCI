// External dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connection } from 'mongoose';

// Internal dependencies
import { UserSchema } from '../schemas';

const schemaProviders = [
	{
		provide: 'USER_MODEL',
		useFactory: (connection: Connection) => connection.model('users', UserSchema),
		inject: ['DATABASE_CONNECTION']
	}
];

export default schemaProviders;
