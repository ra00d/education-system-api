import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from 'src/common/interceptors/files/files.interceptor';
import { CreateMaterialDto } from './dto/createMaterial.dto';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(new FilesInterceptor())
  async uploadFile(
    @Body() createMaterialDto: CreateMaterialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.materialsService.create(createMaterialDto, file.filename);
  }
}
