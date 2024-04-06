import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Logger,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor as FileUploader } from '@nestjs/platform-express';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FilesInterceptor } from 'src/common/interceptors/files/files.interceptor';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @UseInterceptors(FileUploader('materials[]'))
  @UseInterceptors(new FilesInterceptor())
  create(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              /\b(application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document))\b/,
          }),
        ],
      }),
    )
    materials: Array<Express.Multer.File>,
  ) {
    // throw 'error';
    return this.assignmentsService.create(createAssignmentDto, materials);
  }

  @Get()
  findAll() {
    // return { message: 'in find all' };
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
