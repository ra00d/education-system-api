import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get("JWT_TOKEN"),
					global: true,
					signOptions: {
						expiresIn: configService.get("JWT_EXPIRE") ?? "72000s",
					},
				};
			},
		}),
	],
	providers: [AuthService, AuthGuard],
	controllers: [AuthController],
	exports: [AuthGuard],
})
export class AuthModule {}
