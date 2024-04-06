import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { rm } from 'fs/promises';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class FilesInterceptor implements NestInterceptor {
  private logger = new Logger(FilesInterceptor.name, { timestamp: true });
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    return next.handle().pipe(
      catchError(async (err) => {
        const files = ctx.getRequest<Request>().files;
        this.logger.warn(files, 'files');
        if (Array.isArray(files))
          files.forEach(async (file: Express.Multer.File) => {
            await rm(file.path);
          });
        else await rm(ctx.getRequest<Request>().file.path);
        return throwError(() => err);
      }),
    );
  }
}
