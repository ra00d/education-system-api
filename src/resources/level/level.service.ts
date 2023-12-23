import { Inject, Injectable } from "@nestjs/common";
import { CreateLevelDto } from "./dto/create-level.dto";
import { UpdateLevelDto } from "./dto/update-level.dto";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class LevelService {
	constructor(
		@Inject(DATABASE) private readonly databaseService: DatabaseService,
	) {}
	create(createLevelDto: CreateLevelDto) {
		return "This action adds a new level";
	}

	async findAll() {
		const levels = await this.databaseService.level.all({});
		return levels;
	}

	findOne(id: number) {
		return `This action returns a #${id} level`;
	}

	update(id: number, updateLevelDto: UpdateLevelDto) {
		return `This action updates a #${id} level`;
	}

	remove(id: number) {
		return `This action removes a #${id} level`;
	}
}
