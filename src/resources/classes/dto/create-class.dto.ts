import { IsNotEmpty } from 'class-validator';
export class CreateClassDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'level_id is required' })
  level_id: number;

  @IsNotEmpty({ message: 'teacher_id is required' })
  teacher_id: number;

  @IsNotEmpty({ message: 'course_id is required' })
  course_id: number;

  @IsNotEmpty({ message: 'end_at is required' })
  end_at: string;

  @IsNotEmpty({ message: 'start_at is required' })
  start_at: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;
}
