import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { DatabaseModule } from "./database/database.module";
import { CourseModule } from "./resources/course/course.module";
import { LevelModule } from "./resources/level/level.module";
import { MaterialsModule } from "./resources/materials/materials.module";
import { QuestionsModule } from "./resources/questions/questions.module";
import { StudentModule } from "./resources/student/student.module";
import { TeacherModule } from "./resources/teacher/teacher.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ClassesModule } from "./resources/classes/classes.module";
import { RoomsModule } from './resources/rooms/rooms.module';

@Module({
	imports: [
		// ServeStaticModule.forRoot({
		// 	rootPath: join(__dirname, "..", "uploads"),
		// }),
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
		LevelModule,
		QuestionsModule,
		MaterialsModule,
		DashboardModule,
		ClassesModule,
		RoomsModule,
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
