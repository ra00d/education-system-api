import {
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class CourseService {
	constructor(@Inject(DATABASE) private databaseService: DatabaseService) {}
	async create(createCourseDto: CreateCourseDto) {
		try {
			await this.databaseService.courses.create({
				data: {
					name: createCourseDto.name,
					level: {
						connect: {
							id: createCourseDto.level,
						},
					},
					description: createCourseDto.description,
				},
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async findAll(page = 1, limit = 10) {
		try {
			const data = this.databaseService.courses.paginate(
				{
					include: {
						level: true,
					},
				},
				{ page, limit },
			);
			return data;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async findOne(id: number) {
		try {
			return await this.databaseService.courses.findUniqueOrThrow({
				where: {
					id: id,
				},
				select: {
					id: true,
					name: true,
					description: true,
					level: true,
				},
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError)
				throw new NotFoundException("this course does not exist");
		}
		throw new InternalServerErrorException("internal server error");
	}

	async update(id: number, { level, ...course }: UpdateCourseDto) {
		try {
			return await this.databaseService.courses.update({
				where: {
					id: Number(id),
				},
				data: {
					level: level
						? {
								connect: {
									id: level,
								},
						  }
						: undefined,

					name: course.name,
					description: course.description,
				},
			});
		} catch (error) {
			return error;
		}
	}

	remove(id: number) {
		return `This action removes a #${id} course`;
	}
}
