import { IsNotEmpty } from "class-validator";

export class CreateQuestionDto {
	@IsNotEmpty({ message: "question content is required" })
	content: string;

	@IsNotEmpty({ message: "question type is required" })
	type: string;

	@IsNotEmpty({ message: "course is required" })
	course: number;

	@IsNotEmpty({ message: "level is required" })
	level: number;
}
