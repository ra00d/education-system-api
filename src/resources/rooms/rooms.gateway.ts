import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomsService } from "./rooms.service";

interface User {
	roomID: string;
	userID: string;
}

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class RoomsGateway implements OnGatewayConnection {
	// constructor(private readonly roomsService: RoomsService) {}
	handleConnection(client: Socket, ..._args: any[]) {
		client.emit("me", client.id);
	}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage("call-user")
	onnect(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
		console.log("user to call ", data.signalData, "\n\n");

		client.to(data.userToCall).emit("call-user", {
			signal: data?.signalData,
			from: data?.from,
			name: data?.name,
		});
	}
	@SubscribeMessage("answer-call")
	joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
		console.log("answer-call", data.to);

		socket.to(data.to).emit("call-accepted", data.signal);
	}
	@SubscribeMessage("join-class")
	joinClassHandler(
		@ConnectedSocket() socket: Socket,
		@MessageBody() data: any,
	) {
		this.joinClass(socket, "myroom");
		// socket.to(data.to).emit("call-accepted", data.signal);
	}
	@SubscribeMessage("signal")
	handleSignal(
		@ConnectedSocket() client: Socket,
		@MessageBody() data: { signalData: any; userId: string },
	) {
		const receiver = this.users.find((user) => user.userID === data.userId);
		if (receiver) {
			this.server
				.to(receiver.userID)
				.emit("signal", { signalData: data.signalData, userId: client.id });
		}
	}
	private users: User[] = [];
	// connect() {
	// 	console.log("connect");
	//
	// 	return "connected";
	// }
	async joinClass(client: Socket, courseId: string) {
		const user = { userID: client.id, roomID: courseId };
		this.users.push(user);
		this.notifyUsersInRoom(client);
		// await this.databaseService.attendance.create({
		// 	data: {
		// 		studentsId: client.id,
		// 		coursesId: courseId,
		// 	},
		// });
	}

	private notifyUsersInRoom(client: Socket) {
		const usersInRoom = this.users.filter((user) => user.userID !== client.id);
		this.server.to(client.id).emit("class-users", usersInRoom);
	}
	@SubscribeMessage("signal")
	signal(client: Socket, data: any) {
		const receiver = this.users.find((user) => user.userID === data.userId);
		if (receiver) {
			this.server
				.to(receiver.userID)
				.emit("signal", { signalData: data.signalData, userId: client.id });
		}
	}
}
