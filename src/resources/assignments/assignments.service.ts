import { Inject, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { DATABASE } from 'src/common/constants';
import { DatabaseService } from 'src/database/database.service';
import { $Enums } from '@prisma/client';

const getFileType = (mimetype: string) => {
  switch (mimetype) {
    case 'application/pdf':
      return 'PDF';
    case 'application/msword':
      return 'DOCX';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'DOCX';
    default:
      throw 'Invalid file type';
  }
};
@Injectable()
export class AssignmentsService {
  constructor(@Inject(DATABASE) private databaseService: DatabaseService) {}
  async create(
    createAssignmentDto: CreateAssignmentDto,
    materials: Array<Express.Multer.File>,
  ) {
    await this.databaseService.assignments.create({
      data: {
        dead_line: createAssignmentDto.dead_line,
        instructions: createAssignmentDto.instructions,
        courses_id: createAssignmentDto.course,
        materials: {
          createMany: {
            data: materials.map((mat) => ({
              file_path: mat.path,
              course_id: createAssignmentDto.course,
              type: getFileType(mat.mimetype),
            })),
          },
        },
        // : createAssignmentDto.course,
        mark: createAssignmentDto.mark,
      },
    });
  }

  async findAll() {
    return await this.databaseService.assignments.findMany({
      include: {
        materials: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
