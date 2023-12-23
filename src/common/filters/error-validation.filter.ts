import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	UnprocessableEntityException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(UnprocessableEntityException)
export class ValidationErrsFilter implements ExceptionFilter {
	catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();

		const statusCode = exception.getStatus();
		const errors = exception["response"]["message"];
		const message = Array.isArray(errors)
			? " some inputs are invalide "
			: errors;
		res.status(422).send({
			message,
			statusCode,
			errors,
			errorMessage: "Unprocessable content",
		});
	}
}
