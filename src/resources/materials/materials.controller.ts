import {
	Body,
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
	ValidationPipe,
} from "@nestjs/common";
import { MaterialsService } from "./materials.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMaterialDto } from "./dto/createMaterial.dto";
import { FilesInterceptor } from "src/common/interceptors/files/files.interceptor";

@Controller("materials")
export class MaterialsController {
	constructor(private readonly materialsService: MaterialsService) {}
	@Post("upload")
	@UseInterceptors(FileInterceptor("file"))
	@UseInterceptors(new FilesInterceptor())
	async uploadFile(
		@Body() createMaterialDto: CreateMaterialDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return await this.materialsService.create(createMaterialDto, file.filename);
	}
}
