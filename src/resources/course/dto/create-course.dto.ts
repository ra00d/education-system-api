import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCourseDto {
	@IsNotEmpty({ message: "name is required" })
	name: string;
	@IsNotEmpty()
	description: string;

	@IsNotEmpty({ message: "level is required" })
	@IsNumber({ maxDecimalPlaces: 2 }, { message: "level must be a number" })
	level: number;
}
