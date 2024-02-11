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
		let errorFileds = "some";
		if (Array.isArray(errors)) {
			errorFileds = errors.map((error) => Object.keys(error)).join();
		}
		const message = Array.isArray(errors)
			? `${errorFileds} inputs are invalide `
			: errors;
		res.status(422).send({
			message,
			errorFileds,
			statusCode,
			errors,
			errorMessage: "Unprocessable content",
		});
	}
}
