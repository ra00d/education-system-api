import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./database.service";
import { databaseProvider } from "./database";

@Global()
@Module({
	providers: [databaseProvider, PrismaService],
	exports: [PrismaService, "DATABASE"],
})
export class DatabaseModule {}
