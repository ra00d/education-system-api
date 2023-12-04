import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import extension from "prisma-paginate";
export type DatabaseService = ReturnType<PrismaService["withExtension"]>;
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({ log: ["query", "info"] });
		// super.$executeRaw
	}

	async onModuleInit() {
		await this.$connect();
	}

	withExtension() {
		return this.$extends(extension);
	}
}
