import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { rm } from "fs/promises";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class FilesInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		return next.handle().pipe(
			catchError(async (err) => {
				await rm(`./uploads/courses/${ctx.getRequest().file.filename}`);

				return throwError(() => err);
			}),
		);
	}
}
