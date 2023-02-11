// External dependencies
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// Internal dependencies
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(3001);
	Logger.warn(
		"Please note that this API is not meant to be used publicly. It is ONLY meant to be use within the same docker network to communicate with ContinuumCI's API",
		'Nginx API'
	);
}
bootstrap();
