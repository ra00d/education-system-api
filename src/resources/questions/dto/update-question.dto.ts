import { PartialType } from "@nestjs/swagger";
import { CreateRegularQuestionDto } from "./create-question.dto";

export class UpdateQuestionDto extends PartialType(CreateRegularQuestionDto) {}
