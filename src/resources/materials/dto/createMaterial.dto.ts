import { MaterialType } from "@prisma/client";
import { IsIn, IsNotEmpty, IsNumber } from "class-validator";

export class CreateMaterialDto {
	@IsNotEmpty({ message: "material type is required" })
	@IsIn(["PDF", "DOCX", "IMAGE", "VIDEO", "AUDIO"], {
		message: "invalid file type",
	})
	type: MaterialType;

	@IsNotEmpty({ message: "course is required" })
	// @IsNumber({}, { message: "course must be a number" })

	course: number;

	@IsNotEmpty({ message: "teacher is required" })
	// @IsNumber({}, { message: "teacher must be a number" })
	teacher: number;
}
