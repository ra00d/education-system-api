import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty({ message: 'course is required' })
  course: number;
  // @IsNotEmpty({ message: 'materials are required' })
  // @IsArray({ message: 'materials must be an array' })
  // materials: any[];
  @IsNotEmpty({ message: 'mark is required' })
  @IsNumber({}, { message: 'mark must be a number' })
  mark: number;
  @IsNotEmpty({ message: 'instructions are required' })
  instructions: string;
  @IsNotEmpty({ message: 'dead line is required' })
  @IsDate({ message: 'dead line is not a valid date' })
  dead_line: Date;
}
