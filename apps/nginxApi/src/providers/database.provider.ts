// External dependencies
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

// Internal dependencies
import { MONGODB_URI } from '../utils/env';

const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: async (): Promise<typeof mongoose> => {
			const logger = new Logger('Database');

			mongoose.set('strictQuery', false);
			const connection = await mongoose.connect(MONGODB_URI);
			logger.log(
				`Connected to MongoDB Database at ${connection.connection.host}:${connection.connection.port}`
			);
			return connection;
		}
	}
];

export default databaseProviders;
