import { Inject, Injectable } from "@nestjs/common";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";
import {
	CreateMultOptionQuestionDto,
	CreateRegularQuestionDto,
	CreateYesOrNoQuestionDto,
} from "./dto/create-question.dto";

@Injectable()
export class QuestionsService {
	constructor(
		@Inject(DATABASE) private readonly databaseService: DatabaseService,
	) {}
	async createRegularQuestion(createQuestionDto: CreateRegularQuestionDto) {
		const data = await this.databaseService.questions.create({
			data: {
				contents: createQuestionDto.content,
				type: CreateRegularQuestionDto.type,
				course_id: createQuestionDto.course,
			},
		});
		return data;
	}
	async createYseOrNoQuestion(createQuestionDto: CreateYesOrNoQuestionDto) {
		const data = await this.databaseService.questions.create({
			data: {
				contents: createQuestionDto.content,
				type: CreateYesOrNoQuestionDto.type,
				course_id: createQuestionDto.course,
				YesOrNoAnswers: {
					create: {
						answer: createQuestionDto.answer,
					},
				},
			},
		});
		return data;
	}
	async createMultiOptionsQuestion(
		createQuestionDto: CreateMultOptionQuestionDto,
	) {
		const answers = createQuestionDto.options.map((opt, index) => ({
			content: opt,
			correct: createQuestionDto.answer === index + 1,
		}));
		const data = await this.databaseService.questions.create({
			data: {
				contents: createQuestionDto.content,
				type: CreateYesOrNoQuestionDto.type,
				course_id: createQuestionDto.course,
				MultiOptionsAnswers: {
					createMany: {
						data: answers,
					},
				},
			},
		});
		return data;
	}
	async findAll() {
		return await this.databaseService.questions.findMany();
	}
}
