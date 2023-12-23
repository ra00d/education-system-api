import { Module } from "@nestjs/common";
import { MaterialsService } from "./materials.service";
import { MaterialsController } from "./materials.controller";
import { MulterModule } from "@nestjs/platform-express";
import * as multer from "multer";
import { extname } from "path";

@Module({
	imports: [
		MulterModule.register({
			storage: multer.diskStorage({
				destination: "./uploads",
				filename: function (_req, file, cb) {
					const uniqueSuffix =
						Date.now() + "-" + Math.round(Math.random() * 1e9);
					cb(
						null,
						file.originalname.split(".")[0] +
							"-" +
							uniqueSuffix +
							extname(file.originalname),
					);
				},
			}),
		}),
	],
	controllers: [MaterialsController],
	providers: [MaterialsService],
})
export class MaterialsModule {}
