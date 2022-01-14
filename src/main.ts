import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import 'core-js/proposals/reflect-metadata';

async function bootstrap(): Promise<void> {
	const port = process.env.PORT || 6000;
	const app = await NestFactory.create(AppModule);
	// const allowedOrigins = [
	// 	'http://localhost:3000',
	// 	'https://course-admin-app.netlify.app'
	// ];
	// app.enableCors({
	// 	origin: function (origin, callback) {
	// 		// allow requests with no origin
	// 		// (like mobile apps or curl requests)
	// 		if (!origin || allowedOrigins.indexOf(origin) === -1) {
	// 			const msg = new Error(
	// 				'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
	// 			);
	// 			return callback(msg, false);
	// 		}
	// 		return callback(null, true);
	// 	}
	// });

	app.enableCors({});
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(port);
}
bootstrap().then();
