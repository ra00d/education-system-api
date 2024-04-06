import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty({ message: 'exam name is required' })
  name: string;
  @IsNotEmpty({ message: 'exam date is required' })
  @IsDate({ message: 'this is not a valid date' })
  date: Date;
  @IsNumber({}, { message: 'invalid course id' })
  course_id: number;
}
