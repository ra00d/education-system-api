import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { DatabaseService, PrismaService } from "src/database/database.service";
import { CommonService } from "src/common/common.service";

@Injectable()
export class StudentService {
	constructor(
		@Inject("DATABASE")
		private readonly studentModel: DatabaseService,
		private readonly commonService: CommonService,
	) {}
	async create(createStudentDto: CreateStudentDto) {
		const pass_hash = await this.commonService.hashPassword(
			createStudentDto.password,
		);
		return await this.studentModel.student.create({
			data: {
				level: {
					create: {
						name: "Second",
					},
				},
				user: {
					create: {
						email: createStudentDto.email,
						password_hash: pass_hash,
						username: createStudentDto.email,
						role: {
							connect: {
								id: 1,
							},
						},
					},
				},
			},
		});
	}

	async findAll(page = 1, limit = 10) {
		Logger.debug("query start");
		const students = await this.studentModel.student.paginate(
			{
				include: {
					user: {
						include: { role: true },
					},
					level: {
						select: {
							name: true,
						},
					},
				},
			},
			{ page, limit },
		);
		const result = students.result.map((student) =>
			this.commonService.exclude({ ...student, ...student.user }, [
				"password_hash",
				"user",
			]),
		);
		Logger.debug("query ends");
		Logger.debug(students);
		return {
			...students,
			result,
			nextPage: students.nextPage(),
			hasNextPage: students.hasNextPage,
			hasPrevPage: students.hasPrevPage,
			totalPages: students.totalPages,
		};
	}

	findOne(id: number) {
		return `This action returns a #${id} student`;
	}

	update(id: number, updateStudentDto: UpdateStudentDto) {
		return `This action updates a #${id} student`;
	}

	remove(id: number) {
		return `This action removes a #${id} student`;
	}
}
