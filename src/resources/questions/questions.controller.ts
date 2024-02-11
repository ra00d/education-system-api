import { Controller, Get, Post, Body } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import {
	CreateMultOptionQuestionDto,
	CreateRegularQuestionDto,
	CreateYesOrNoQuestionDto,
} from "./dto/create-question.dto";

@Controller("questions")
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Post()
	createRegularQuestion(@Body() createQuestionDto: CreateRegularQuestionDto) {
		return this.questionsService.createRegularQuestion(createQuestionDto);
	}

	@Post()
	createYseOrNoQuestion(@Body() createQuestionDto: CreateYesOrNoQuestionDto) {
		return this.questionsService.createYseOrNoQuestion(createQuestionDto);
	}

	@Post()
	createMultiOptionsQuestion(
		@Body() createQuestionDto: CreateMultOptionQuestionDto,
	) {
		return this.questionsService.createMultiOptionsQuestion(createQuestionDto);
	}
	//
	// @Post()
	// createRegularQuestion(@Body() createQuestionDto: CreateRegularQuestionDto) {
	// 	return this.questionsService.createRegularQuestion(createQuestionDto);
	// }
	//
	@Get()
	findAll() {
		return this.questionsService.findAll();
	}
}
