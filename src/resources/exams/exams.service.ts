import { Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { DATABASE } from 'src/common/constants';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExamsService {
  constructor(
    @Inject(DATABASE) private readonly databaseService: DatabaseService,
  ) {}
  async create(createExamDto: CreateExamDto) {
    const exam = await this.databaseService.exams.create({
      data: {
        name: createExamDto.name,
        date: createExamDto.date,
        course_id: createExamDto.course_id,
      },
    });
    return exam;
  }

  async findAll() {
    const exams = await this.databaseService.exams.all();
    return exams;
  }

  async findOne(id: number) {
    const exam = await this.databaseService.exams.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return exam;
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    return await this.databaseService.exams.update({
      where: {
        id,
      },
      data: {
        ...updateExamDto,
      },
    });
  }

  async remove(id: number) {
    await this.databaseService.exams.delete({
      where: {
        id,
      },
    });
  }
  async addQuestion(id: number, qId: number) {
    const exam = await this.databaseService.questions.update({
      where: {
        id: qId,
      },
      data: {
        exam_id: id,
      },
    });
    return await this.databaseService.exams.findUniqueOrThrow({
      where: {
        id: exam.exam_id,
      },
    });
  }
}
