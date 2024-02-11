import {
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { CommonService } from "src/common/common.service";
import { DatabaseService } from "src/database/database.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { $Enums } from "@prisma/client";

@Injectable()
export class StudentService {
	constructor(
		@Inject("DATABASE")
		private readonly databaseService: DatabaseService,
		private readonly commonService: CommonService,
	) {}
	async create(createStudentDto: CreateStudentDto) {
		const pass_hash = await this.commonService.hashPassword("123456");
		// try {
		const student = await this.databaseService.students.create({
			data: {
				// level: {
				// 	connect: {
				// 		id: createStudentDto.level,
				// 	},
				// },
				birthdate: createStudentDto.birthdate,
				grade: createStudentDto.grade,
				user: {
					create: {
						name: createStudentDto.name,
						email: createStudentDto.email,
						password: pass_hash,
						phone: createStudentDto.phone,
					},
				},
			},
		});
		return student;
	}

	async findAll(page = 0, limit = 10) {
		try {
			const [students, meta] = await this.databaseService.students
				.paginate({
					include: {
						user: {
							select: {
								name: true,
								email: true,
								phone: true,
							},
						},
						// level: true,
					},
				})
				.withPages({
					limit,
					page,
				});
			return {
				result: students,
				...meta,
			};
		} catch {
			return [];
		}
	}

	async findOne(id: string) {
		// try {
		const data = await this.databaseService.students.findUniqueOrThrow({
			where: {
				id: Number(id),
				user: {
					role: $Enums.Role.STUDENT,
				},
			},
			include: {
				user: {
					select: {
						email: true,
						name: true,
						phone: true,
					},
				},
				// level: true,
			},
		});
		return {
			// level: data.level,
			...data.user,
		};
		// } catch (error: unknown) {
		// 	if (error instanceof PrismaClientKnownRequestError) {
		// 		throw new NotFoundException("there is no student with this id");
		// 	}
		// 	throw new InternalServerErrorException("internal server error");
		// }
	}

	async update(id: string, { level, ...user }: UpdateStudentDto) {
		// let pass_hash;
		if (user.password)
			user.password = await this.commonService.hashPassword(user.password);
		try {
			const student = await this.findOne(id);
			return await this.databaseService.students.update({
				where: {
					id: Number(id),
					user: {
						role: $Enums.Role.STUDENT,
					},
				},
				data: {
					// level: {
					// 	connect: {
					// 		id: level ?? student.level.id,
					// 	},
					// },
					user: {
						update: {
							where: {
								id: Number(id),
							},
							data: {
								...user,
							},
						},
					},
				},
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new NotFoundException("this email is already used", {
					description: error.stack,
				});
			}
			console.log(error);
			throw new InternalServerErrorException("internal server error");
		}
	}

	async remove(id: number) {
		return this.databaseService.students.delete({
			where: {
				id,
			},
		});
	}
}
