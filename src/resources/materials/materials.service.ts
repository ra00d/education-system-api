import {
	Inject,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";
import { CreateMaterialDto } from "./dto/createMaterial.dto";
import { rm } from "fs/promises";

@Injectable()
export class MaterialsService {
	constructor(
		@Inject(DATABASE) private readonly databaseService: DatabaseService,
	) {}

	async create(createMaterialDto: CreateMaterialDto, file: string) {
		try {
			const data = await this.databaseService.materials.create({
				data: {
					type: createMaterialDto.type,
					course_id: Number(createMaterialDto.course),
					teacher_id: Number(createMaterialDto.teacher),
					file_path: `uploads/${file}`,
				},
			});
			return data;
		} catch (error) {
			// await rm(`./uploads/${file}`);
			throw new InternalServerErrorException(error);
		}
	}
}
