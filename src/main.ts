import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import {
	UnprocessableEntityException,
	ValidationError,
	ValidationPipe,
} from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ValidationErrsFilter } from "./common/filters/error-validation.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
	});
	// app.enableCors({
	// 	origin: "*",
	// 	credentials: true,
	// });
	app.use(cookieParser());
	app.use(helmet());
	app.useGlobalFilters(new ValidationErrsFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			enableDebugMessages: true,
			errorHttpStatusCode: 422,
			exceptionFactory: (errors: ValidationError[]) => {
				const errorMessages = errors.map((err) => {
					return {
						[err.property]: Object.values(err.constraints)[0],
					};
				});
				return new UnprocessableEntityException(errorMessages, {});
			},
		}),
	);
	await app.listen(3000);
}
bootstrap();
