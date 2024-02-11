import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomsGateway } from "./rooms.gateway";

@Module({
	// imports: [RoomsGateway],
	providers: [RoomsService, RoomsGateway],
	// exports: [RoomsGateway],
})
export class RoomsModule {}
