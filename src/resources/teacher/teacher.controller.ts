import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Controller("teacher")
export class TeacherController {
	constructor(private readonly teacherService: TeacherService) {}

	@Post()
	create(@Body() createTeacherDto: CreateTeacherDto) {
		return this.teacherService.create(createTeacherDto);
	}

	@Get()
	findAll(@Query("page") page: number, @Query("limit") limit: number) {
		return this.teacherService.findAll(+page, +limit);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.teacherService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
		return this.teacherService.update(id, updateTeacherDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.teacherService.remove(+id);
	}
}
