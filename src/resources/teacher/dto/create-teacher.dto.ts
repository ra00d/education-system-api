import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	MinLength,
} from "class-validator";

export class CreateTeacherDto {
	@IsOptional()
	@IsPhoneNumber("SA", { message: "this value is not a valid phone number" })
	phone: string;
	@IsNotEmpty({ message: "name is required" })
	name: string;
	@IsEmail({}, { message: "This is not a valid email" })
	email: string;
	@MinLength(6, {
		message: "This password is too short",
	})
	password: string;
	@IsOptional()
	degree: string;
}
