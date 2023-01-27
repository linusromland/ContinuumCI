// External dependencies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connection } from 'mongoose';

// Internal dependencies
// import { ExampleSchema } from '../schemas';

const schemaProviders = [
	/*{
	provide: 'EXAMPLE_MODEL',
	useFactory: (connection: Connection) => connection.model('Example', ExampleSchema),
	inject: ['DATABASE_CONNECTION']
	}*/
];

export default schemaProviders;
