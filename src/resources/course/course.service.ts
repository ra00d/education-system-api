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

	async create(createCourseDto: CreateCourseDto, img: string) {
		// try {
		await this.databaseService.courses.create({
			data: {
				name: createCourseDto.name,
				level: {
					connect: {
						id: createCourseDto.level,
					},
				},
				teacher: {
					connect: {
						id: 1,
					},
				},
				description: createCourseDto.description,
				cover_img: `uploads/courses/${img}`,
				start_at: createCourseDto.start_at,
				end_at: createCourseDto.end_at,
				price: createCourseDto.price,
			},
		});
		// } catch (error) {
		// throw new InternalServerErrorException(error);
		// }
	}

	async findAll(page = 1, limit = 10) {
		// const [data, meta] = await this.databaseService.courses
		// 	.paginate({
		// 		include: {
		// 			level: true,
		// 		},
		// 		// where: {
		// 		// 	description: {
		// 		// 		search: "arabic course",
		// 		// 	},
		// 		// },
		// 	})
		// 	.withPages({
		// 		limit,
		// 		page,
		// 	});
		// return { result: data, ...meta };
		return await this.databaseService.courses.findMany();
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
					start_at: true,
					cover_img: true,
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
		console.log(course);

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
	}

	async remove(id: number) {
		return await this.databaseService.courses.delete({
			where: {
				id,
			},
		});
	}
}
