import {
	IsDate,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	Min,
} from "class-validator";

export class CreateCourseDto {
	@IsNotEmpty({ message: "name is required" })
	name: string;
	@IsNotEmpty()
	description: string;

	@IsNotEmpty({ message: "level is required" })
	@IsNumber({ maxDecimalPlaces: 2 }, { message: "level must be a number" })
	level: number;

	@IsNotEmpty({ message: "the start date value is required" })
	@IsDate({ message: "the start date must be a valid date value" })
	start_at: Date;
	@IsNotEmpty({ message: "the end date value is required" })
	@IsDate({ message: "the end date must be a valid date value" })
	end_at: Date;

	@IsNotEmpty({ message: "course price is required" })
	@IsNumber({}, { message: "price must be a number" })
	@IsPositive({ message: "nigative values are not allowed" })
	@Min(10, { message: "this price is too low" })
	price: number;

	@IsNotEmpty({ message: "course teacher is required" })
	@IsNumber({ maxDecimalPlaces: 2 }, { message: "invalid value" })
	teacher: number;
}
