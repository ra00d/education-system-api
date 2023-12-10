import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { TeacherModule } from "./resources/teacher/teacher.module";
import { StudentModule } from "./resources/student/student.module";
import { CommonModule } from "./common/common.module";
import { CourseModule } from './resources/course/course.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
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
		DatabaseModule,
		AuthModule,
		TeacherModule,
		StudentModule,
		CommonModule,
		CourseModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		// {
		// 	provide: APP_GUARD,
		// 	useClass: AuthGuard,
		// },
	],
})
export class AppModule {}
