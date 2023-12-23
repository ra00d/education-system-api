import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import {
	UnprocessableEntityException,
	ValidationError,
	ValidationPipe,
} from "@nestjs/common";
import { ValidationErrsFilter } from "./common/filters/error-validation.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DatabaseExceptionFilter } from "./common/filters/database-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		logger: ["error"],
	});
	// app.enableCors({
	// 	origin: "*",
	// 	credentials: true,
	// });
	app.use(cookieParser());
	app.use(helmet());
	app.useGlobalFilters(
		new ValidationErrsFilter(),
		new DatabaseExceptionFilter(),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
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
	const config = new DocumentBuilder()
		.setTitle("Education example")
		.setDescription("The cats API description")
		.setVersion("1.0")
		.addTag("cats")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	await app.listen(3000);
}
bootstrap();
