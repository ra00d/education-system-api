import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	MinLength,
	IsInt,
	IsDate,
} from "class-validator";
export class CreateStudentDto {
	@IsOptional()
	@IsPhoneNumber("SA", { message: "this value is not a valid phone number" })
	phone: string;

	@IsNotEmpty({ message: "name is required" })
	@MinLength(4, { message: "too short name" })
	name: string;

	@IsEmail({}, { message: "This is not a valid email" })
	email: string;

	@IsInt({ message: "level must be a number" })
	level: number;

	@IsDate({ message: "this date is invalid" })
	birthdate: Date;

	@IsNotEmpty({ message: "the student grade is required" })
	grade: string;
}
