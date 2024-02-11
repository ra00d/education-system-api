import { IsArray, IsNotEmpty } from "class-validator";
import { QuestionType } from "src/types/questions";

abstract class QuestionDto {
	@IsNotEmpty({ message: "question content is required" })
	content: string;

	@IsNotEmpty({ message: "course is required" })
	course: number;
}
export class CreateRegularQuestionDto extends QuestionDto {
	@IsNotEmpty({ message: "the answer is required" })
	answer: string;
	static type = QuestionType.REGULAR;
}
export class CreateMultOptionQuestionDto extends QuestionDto {
	static type = QuestionType.MULTIOPTIONS;
	@IsNotEmpty({ message: "the answer number is required" })
	answer: number;

	@IsArray({ message: "the options must be an array of values" })
	options: string[];
}
export class CreateYesOrNoQuestionDto extends QuestionDto {
	static type = QuestionType.YESORNO;
	@IsNotEmpty({ message: "the answer  is required" })
	answer: boolean;
}
