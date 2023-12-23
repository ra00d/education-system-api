import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	MinLength,
	IsInt,
} from "class-validator";
export class CreateStudentDto {
	@IsOptional()
	@IsPhoneNumber("SA", { message: "this value is not a valid phone number" })
	phone: string;
	@IsNotEmpty({ message: "name is required" })
	name: string;
	@IsEmail({}, { message: "This is not a valid email" })
	email: string;
	@IsInt({ message: "level must be a number" })
	level: number;
	@MinLength(6, {
		message: "This password is too short",
	})
	password: string;
}
