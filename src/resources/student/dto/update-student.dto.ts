import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDto } from "./create-student.dto";
import {
	IsEmpty,
	IsNotEmpty,
	IsOptional,
	MinLength,
	ValidateIf,
} from "class-validator";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
	@MinLength(6, {
		message: "This password is too short",
	})
	@IsOptional()
	password: string;

	@ValidateIf(
		(o: UpdateStudentDto) =>
			o.password && o.password !== o.password_confirmation,
	)
	@IsEmpty({ message: "passwords  does not match" })
	@IsNotEmpty()
	password_confirmation: string;
}
