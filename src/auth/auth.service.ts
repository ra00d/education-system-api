import { Inject, Injectable, Logger, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import * as bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
@Injectable()
export class AuthService {
	constructor(
		@Inject("DATABASE") private databaseService: DatabaseService
	) { }

	async signUp(user: Prisma.userCreateInput) {
		const salt = await bcrypt.genSalt();
		const password_hash = await bcrypt.hash(user?.password_hash, salt);
		try {

			const userData = await this.databaseService.user.create({
				data: { email:user.email, password_hash, username: user.email,role:{
					create:{
						role_name:"STUDENT"
					}
				} },
			});
			const userRes=await this.databaseService.user.update({
				where:{
					id:userData.id
				},
				data:{
					last_login:new Date(),
					is_active:true
				}
			})
			return userRes;
		} catch (error) {
			Logger.error(error);
			throw new UnprocessableEntityException("this email already used");
		}
	}

	async signIn(email: string, password: string) {
		const user = await this.databaseService.user.findUnique({
			where: {
				email: email.trimEnd(),
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
			const userRes=await this.databaseService.user.update({
				where:{
					id:user.id
				},
				data:{
					last_login:new Date(),
					is_active:true
				}
			})
			return userRes;
	}
}
