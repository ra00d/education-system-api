import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "src/database/database.service";
import * as bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
	constructor(
		@Inject("DATABASE")
		private readonly databaseService: DatabaseService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async signUp(user: Prisma.UsersCreateInput) {
		const salt = await bcrypt.genSalt();
		const password_hash = await bcrypt.hash(user?.password, salt);
		const userData = this.databaseService.users.create({
			data: { ...user, password: password_hash },
		});
		return userData;
	}

	async signIn(email: string, password: string) {
		const user = await this.databaseService.users.login(email, password);
		return {
			access_token: await this.jwtService.signAsync(
				{ sub: user.sub, username: user.username },
				{
					secret: this.configService.get("JWT_SECRET"),
				},
			),
			user: user,
		};
	}
}
