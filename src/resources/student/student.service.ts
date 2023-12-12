import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { DatabaseService } from "src/database/database.service";
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
		return await this.studentModel.students.create({
			data: {
				email: createStudentDto.email,
				lastName: createStudentDto.name,
				firstName: createStudentDto.name,
				users: {
					create: {
						password: pass_hash,
						username: createStudentDto.email,
						userType: "STUDENT",
					},
				},
			},
		});
	}

	async findAll(page = 1, limit = 10) {
		// Logger.debug("query start");
		const students = await this.studentModel.students.paginate(
			{
				include: {
					users: {
						select: {
							username: true,
							levels: {
								select: { levelName: true },
							},
						},
					},
				},
			},
			{ page, limit },
		);
		const result = students.result.map((student) =>
			this.commonService.exclude(
				{
					id: student.userID,
					name: student.firstName + " " + student.lastName,
					level: student.users.levels.levelName,
					email: student.email,
				},
				["password_hash", "user"],
			),
		);
		// Logger.debug("query ends");
		// Logger.debug(students);
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
