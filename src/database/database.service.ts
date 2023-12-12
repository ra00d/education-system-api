import {
	Injectable,
	OnModuleInit,
	UnauthorizedException,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import extension from "prisma-paginate";
import * as bcrypt from "bcrypt";

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
		return this.$extends(extension).$extends({
			model: {
				users: {
					async signUp(
						email: string,
						password: string,
						role_id: string | number,
					) {
						const client = Prisma.getExtensionContext(this);
						const hash = await bcrypt.hash(password, 10);
						return client.user.create({
							data: {
								email,
								username: email,
								password_hash: hash,
								role: {
									connect: {
										id: Number(role_id),
									},
								},
							},
						});
					},
					async findByEmail(email: string) {
						const client = Prisma.getExtensionContext(this);
						return client.findFirst({
							where: { email },
						});
					},
					async login(email: string, password: string) {
						const client = Prisma.getExtensionContext(this);
						const user = await client.findFirst({
							where: {
								email: email,
							},
							select: {
								role: {
									select: {
										role_name: true,
									},
								},
								password_hash: true,
								email: true,
								username: true,
								id: true,
							},
						});
						if (!user) {
							throw new UnauthorizedException("wrong email or password");
						}
						// const salt= await bcrypt.genSalt();
						const isMatch = await bcrypt.compare(password, user.password_hash);
						if (!isMatch) {
							throw new UnauthorizedException("wrong email or password");
						}
						const payload = {
							sub: user.id,
							username: user.email,
							role: user.role.role_name,
						};
						await client.update({
							where: { id: user.id },
							data: {
								last_login: new Date(),
							},
						});
						return payload;
					},
				},
			},
		});

		// return client;
	}

	async hashPassword(pass: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		const password_hash = await bcrypt.hash(pass, salt);
		return password_hash;
	}
}
