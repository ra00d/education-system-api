import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesInterceptor } from "src/common/interceptors/files/files.interceptor";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

// TODO : change to courses
@Controller("course")
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	@Post()
	@UseInterceptors(FileInterceptor("cover_img"))
	// @UseInterceptors(new FilesInterceptor())
	create(
		@Body() createCourseDto: CreateCourseDto,
		@UploadedFile() cover_img: Express.Multer.File,
	) {
		console.log(createCourseDto);

		return this.courseService.create(createCourseDto, cover_img.filename);
	}

	@Get()
	findAll() {
		return this.courseService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.courseService.findOne(+id);
	}

	@Put(":id")
	@UseInterceptors(FileInterceptor("cover_img"))
	update(@Param("id") id: number, @Body() updateCourseDto: UpdateCourseDto) {
		return this.courseService.update(+id, updateCourseDto);
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.courseService.remove(+id);
	}
}
