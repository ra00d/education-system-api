import { Injectable } from "@nestjs/common";
import { PrismaService } from "./database.service";
import { extension } from "prisma-paginate";

@Injectable()
export class Database {}
export const databaseProvider = {
	provide: "DATABASE",
	useFactory: (databaseService: PrismaService) => {
		const client = databaseService.$extends(extension);
		return client;
	},
	inject: [PrismaService],
};
