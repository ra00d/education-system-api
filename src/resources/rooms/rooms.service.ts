import { Inject, Injectable } from "@nestjs/common";
import { WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DATABASE } from "src/common/constants";
import { DatabaseService } from "src/database/database.service";
import { RoomsGateway } from "./rooms.gateway";
interface User {
	roomID: string;
	userID: string;
}
@Injectable()
export class RoomsService {
	signal(client: Socket, data: any) {
		const receiver = this.users.find((user) => user.userID === data.userId);
		if (receiver) {
			this.server
				.to(receiver.userID)
				.emit("signal", { signalData: data.signalData, userId: client.id });
		}
	}
	constructor(
		@Inject(DATABASE) private readonly databaseService: DatabaseService,
		private gateway: RoomsGateway,
	) {}
	@WebSocketServer() server: Server;
	private users: User[] = [];
	connect() {
		console.log("connect");

		return "connected";
	}
	async joinClass(client: Socket, courseId: string) {
		const user = { userID: client.id, roomID: courseId };
		this.users.push(user);
		// this.notifyUsersInRoom(client);
		// await this.databaseService.attendance.create({
		// 	data: {
		// 		studentsId: client.id,
		// 		coursesId: courseId,
		// 	},
		// });
	}

	private notifyUsersInRoom(client: Socket) {
		const usersInRoom = this.users.filter((user) => user.roomID === client.id);
		this.server.to(client.id).emit("class-users", usersInRoom);
	}
}
