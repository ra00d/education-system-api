import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DatabaseService, PrismaService } from "./database.service";
import { extension } from "prisma-paginate";
import * as bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

@Injectable()
export class Database {}
export const databaseProvider = {
	provide: "DATABASE",
	useFactory: (databaseService: PrismaService) => {
		const client = databaseService.withExtension();
		// .$extends({
		// 	model: {
		// 		user: {
		// 			async signUp(
		// 				email: string,
		// 				password: string,
		// 				role_id: string | number,
		// 			) {
		// 				const client = Prisma.getExtensionContext(this);
		// 				const hash = await bcrypt.hash(password, 10);
		// 				return client.user.create({
		// 					data: {
		// 						email,
		// 						username: email,
		// 						password_hash: hash,
		// 						role: {
		// 							connect: {
		// 								id: Number(role_id),
		// 							},
		// 						},
		// 					},
		// 				});
		// 			},
		// 			async findManyByEmail(email: string) {
		// 				const client = Prisma.getExtensionContext(this);
		// 				return client.user.findFirst({
		// 					where: { email },
		// 				});
		// 			},
		// 			async login(email: string, password: string) {
		// 				const client = Prisma.getExtensionContext(this);
		// 				const user = await client.user.findFirst({
		// 					where: {
		// 						email: email,
		// 					},
		// 					select: {
		// 						role: {
		// 							select: {
		// 								role_name: true,
		// 							},
		// 						},
		// 						password_hash: true,
		// 						email: true,
		// 						username: true,
		// 						id: true,
		// 					},
		// 				});
		// 				if (!user) {
		// 					throw new UnauthorizedException("wrong email or password");
		// 				}
		// 				// const salt= await bcrypt.genSalt();
		// 				const isMatch = await bcrypt.compare(password, user.password_hash);
		// 				if (!isMatch) {
		// 					throw new UnauthorizedException("wrong email or password");
		// 				}
		// 				const payload = {
		// 					sub: user.id,
		// 					username: user.email,
		// 					role: user.role.role_name,
		// 				};
		// 				await this.databaseService.user.update({
		// 					where: { id: user.id },
		// 					data: {
		// 						last_login: new Date(),
		// 					},
		// 				});
		// 				return payload;
		// 			},
		// 		},
		// 	},
		// });
		return client;
	},
	inject: [PrismaService],
};
