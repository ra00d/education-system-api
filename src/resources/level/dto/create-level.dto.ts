import { IsNotEmpty } from "class-validator";

export class CreateLevelDto {
	@IsNotEmpty({ message: "level name is required" })
	name: string;
}
