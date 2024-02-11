import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

@Catch(PrismaClientKnownRequestError)
export class DatabaseExceptionFilter implements ExceptionFilter {
	catch(e: PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		let status = 500;
		let errors = null;
		let message = "internal server error";
		switch (e.code.toLowerCase()) {
			case "p2001":
				status = 404;
				message = "this resource does not exist";
				break;
			case "p2002":
				status = 422;
				errors = [{ email: "the email address is already used" }];
				this.contains(e.meta?.target as string, "email");
				message = "the email address is already used";
				break;
			case "p2025":
				status = 404;
				message = "this item does not exist";
				break;
			default:
				break;
		}
		return res.status(status).send({
			message,
			error: e,
			errors,
			statusCode: status,
		});
	}
	contains(data: string, str: string): boolean {
		return data.includes(str);
	}
}
