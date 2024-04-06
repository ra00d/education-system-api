import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './uploads/assignments',
        filename: function (_req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.originalname.split('.')[0] +
              '-' +
              uniqueSuffix +
              extname(file.originalname),
          );
        },
      }),
    }),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
