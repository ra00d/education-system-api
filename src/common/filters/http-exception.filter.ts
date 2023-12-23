import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	InternalServerErrorException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(InternalServerErrorException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		let status = 500;
		if (exception instanceof HttpException) status = exception?.getStatus();

		response.status(status).json({
			// statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			error: exception.cause,
			message: exception.message,
			// stack: exception.stack,
			exception: exception,
		});
	}
}
