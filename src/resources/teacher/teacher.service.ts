import {
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnprocessableEntityException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";
import { CommonService } from "src/common/common.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { $Enums } from "@prisma/client";

@Injectable()
export class TeacherService {
	constructor(
		@Inject(DATABASE) private databaseService: DatabaseService,
		private commonService: CommonService,
	) {}
	async create(createTeacherDto: CreateTeacherDto) {
		const pass_hash = await this.commonService.hashPassword(
			createTeacherDto.password,
		);
		return await this.databaseService.teachers.create({
			data: {
				degree: createTeacherDto.degree,
				user: {
					create: {
						name: createTeacherDto.name,
						email: createTeacherDto.email,
						password: pass_hash,
						phone: createTeacherDto.phone,
						role: $Enums.Role.TEACHER,
					},
				},
			},
		});
	}

	async findAll(page = 1, limit = 10) {
		if (page == 0) page = 1;
		try {
			const [data, meta] = await this.databaseService.teachers
				.paginate({
					select: {
						id: true,
						degree: true,
						user: {
							select: {
								email: true,
								phone: true,
								name: true,
							},
						},
					},
				})
				.withPages({
					limit,
					page,
				});
			const teachers = data.map(({ id, user: { name, email, phone } }) => ({
				id,
				name,
				email,
				phone,
			}));
			return {
				result: teachers,
				...meta,
			};
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async findOne(id: string) {
		try {
			const teacher = await this.databaseService.teachers.findUniqueOrThrow({
				where: {
					id: Number(id),
					user: {
						role: $Enums.Role.TEACHER,
					},
				},
				include: {
					user: {
						select: {
							name: true,
							phone: true,
							email: true,
						},
					},
				},
			});
			return {
				degree: teacher.degree,
				...teacher.user,
			};
		} catch (error: unknown) {
			if (error instanceof PrismaClientKnownRequestError) {
				throw new NotFoundException("there is no teacher with this id");
			}
			throw new InternalServerErrorException("internal server error");
		}
	}

	async update(id: string, updateTeacherDto: UpdateTeacherDto) {
		// const teacher = await this.findOne(id);
		if (updateTeacherDto.password)
			updateTeacherDto.password = await this.commonService.hashPassword(
				updateTeacherDto.password,
			);
		try {
			return await this.databaseService.teachers.update({
				where: {
					id: Number(id),
				},
				data: {
					user: {
						update: {
							// name: updateTeacherDto.name ?? teacher.name,
							// email: updateTeacherDto.email ?? teacher.email,
							// phone: updateTeacherDto.phone ?? teacher.phone,
							...updateTeacherDto,
						},
					},
				},
			});
		} catch (err: unknown) {
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === "P2002")
					if (err.meta?.target === "user_email_key") {
						throw new UnprocessableEntityException(
							"the email address is allready used",

							{
								description: "the email address is allready used",
							},
						);
					}
			}
			throw new InternalServerErrorException();
		}
	}

	remove(id: number) {
		return `This action removes a #${id} teacher`;
	}
}
