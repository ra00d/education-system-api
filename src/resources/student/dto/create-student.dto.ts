import { IsEmail, MinLength } from "class-validator";
export class CreateStudentDto {
	name: string;
	@IsEmail({}, { message: "This is not a valid email" })
	email: string;
	level: string;
	@MinLength(6, {
		message: "This password is too short",
	})
	password: string;
}
