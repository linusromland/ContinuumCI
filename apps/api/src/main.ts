// External dependencies
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Internal dependencies
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('ContinuumCI API')
		.setDescription('The API Documentation for ContinuumCI')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(3000);
}
bootstrap();
