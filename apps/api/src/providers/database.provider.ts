// External dependencies
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: async (): Promise<typeof mongoose> => {
			const logger = new Logger('Database');

			mongoose.set('strictQuery', false);
			const connection = await mongoose.connect(
				'mongodb://127.0.0.1:27017/ContinuumCI'
			);
			logger.log(
				`Connected to MongoDB Database at ${connection.connection.host}:${connection.connection.port}`
			);
			return connection;
		}
	}
];

export default databaseProviders;
