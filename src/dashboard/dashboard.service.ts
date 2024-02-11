import { Inject, Injectable } from "@nestjs/common";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class DashboardService {
	constructor(
		@Inject(DATABASE) private readonly databaseService: DatabaseService,
	) {}

	async getInfo() {
		const students = await this.databaseService.students.count();
		const teachers = await this.databaseService.teachers.count();
		const levels = await this.databaseService.level.count();
		const courses = await this.databaseService.courses.count();

		return {
			students,
			teachers,
			levels,
			courses,
		};
	}
}
