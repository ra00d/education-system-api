import { Inject, Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class QuestionsService {
	constructor(
		@Inject(DATABASE) private readonly databaseService: DatabaseService,
	) {}
	async create(createQuestionDto: CreateQuestionDto) {
		const data = await this.databaseService.questions.create({
			data: {
				contents: createQuestionDto.content,
				type: createQuestionDto.type,
				level_id: createQuestionDto.level,
				course_id: createQuestionDto.course,
			},
		});
		return data;
	}

	async findAll() {
		return await this.databaseService.questions.findMany();
	}

	findOne(id: number) {
		return `This action returns a #${id} question`;
	}

	update(id: number, updateQuestionDto: UpdateQuestionDto) {
		return `This action updates a #${id} question`;
	}

	remove(id: number) {
		return `This action removes a #${id} question`;
	}
}
