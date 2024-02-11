import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ClassesService {
	constructor(@Inject(DATABASE) private databaseServcie: DatabaseService) {}
	async create(createClassDto: CreateClassDto) {
		return await this.databaseServcie.classes.create({
			data: {
				...createClassDto,
			},
		});
	}

	async findAll() {
		return await this.databaseServcie.classes.findMany({
			include: {
				course: {
					select: {
						cover_img: true,
					},
				},
				level: {
					select: {
						name: true,
					},
				},
			},
		});
	}

	async findOne(id: number) {
		const classData = await this.databaseServcie.classes.findFirst({
			where: { id },
		});
		if (!classData) {
			throw new NotFoundException({
				message: `class with id ${id} is not found`,
				statusCode: 404,
			});
		}
		return classData;
	}

	async update(id: number, updateClassDto: UpdateClassDto) {
		console.log(id, updateClassDto);

		return await this.databaseServcie.classes.update({
			data: {
				...updateClassDto,
			},
			where: {
				id,
			},
		});
	}

	async remove(id: number) {
		return await this.databaseServcie.classes.delete({
			where: {
				id,
			},
		});
	}
}
