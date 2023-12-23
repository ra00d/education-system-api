import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

@Catch(PrismaClientKnownRequestError)
export class DatabaseExceptionFilter implements ExceptionFilter {
	catch(e: PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		let status = 500;
		let message = "internal server error";
		switch (e.code.toLowerCase()) {
			case "p2001":
				status = 404;
				message = "this resource does not exist";
				break;
			case "p2002":
				status = 422;
				this.contains(e.meta?.target as string, "email");
				message = "the email address is already used";
				break;
			// case "p2003":
			// status = 500;
			// message = "";
			// break;
			default:
				break;
		}
		return res.status(status).send({
			message,
			error: e,
			statusCode: status,
		});
	}
	contains(data: string, str: string): boolean {
		return data.includes(str);
	}
}
